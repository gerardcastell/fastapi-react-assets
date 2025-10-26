describe("Error Handling", () => {
  describe("Network Errors", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should handle 500 error when fetching interest rate", () => {
      cy.intercept("GET", "**/interest_rate", {
        statusCode: 500,
        body: { error: "Internal server error" },
      }).as("getAverageInterestRate");

      cy.visit("/");
      cy.wait("@getAverageInterestRate");

      // Should show error message
      cy.contains("Failed to load").should("be.visible");
    });

    it("should handle 404 error when no assets exist", () => {
      cy.interceptGetAverageInterestRate(undefined, 404);
      cy.visit("/");
      cy.wait("@getAverageInterestRate");

      // Should show default state
      cy.contains("--").should("be.visible");
    });

    it("should handle network timeout", () => {
      cy.intercept("GET", "**/interest_rate", (req) => {
        req.destroy(); // Simulate network failure
      }).as("getAverageInterestRate");

      cy.visit("/");

      // Should handle gracefully
      cy.contains("Average Interest Rate").should("be.visible");
    });
  });

  describe("Form Submission Errors", () => {
    beforeEach(() => {
      cy.visit("/assets/new");
    });

    it("should handle 400 bad request error", () => {
      cy.intercept("POST", "**/asset", {
        statusCode: 400,
        body: { detail: "Invalid asset data" },
      }).as("postAssets");

      cy.fillAssetForm(0, "ASSET-001", 5.5);
      cy.contains("button", "Create Assets").click();

      cy.wait("@postAssets");
      // Form should still be visible
      cy.contains("h4", "Create Assets").should("be.visible");
    });

    it("should handle 422 validation error", () => {
      cy.intercept("POST", "**/asset", {
        statusCode: 422,
        body: {
          detail: [
            {
              loc: ["body", "assets", 0, "interest_rate"],
              msg: "Error calculating interest rate",
              type: "value_error",
            },
          ],
        },
      }).as("postAssets");

      cy.fillAssetForm(0, "ASSET-001", -5.5);
      cy.contains("button", "Create Assets").click();

      cy.wait("@postAssets");
      cy.contains("h4", "Create Assets").should("be.visible");
    });

    it("should handle 500 server error on submission", () => {
      cy.interceptPostAssets(500);

      cy.fillAssetForm(0, "ASSET-001", 5.5);
      cy.contains("button", "Create Assets").click();

      cy.wait("@postAssets");
      // Should stay on form page
      cy.contains("h4", "Create Assets").should("be.visible");
    });

    it("should allow retry after error", () => {
      // First attempt fails
      cy.intercept("POST", "**/asset", {
        statusCode: 500,
      }).as("postAssetsFail");

      cy.fillAssetForm(0, "ASSET-001", 5.5);
      cy.contains("button", "Create Assets").click();
      cy.wait("@postAssetsFail");

      // Second attempt succeeds
      cy.interceptPostAssets(201);
      cy.contains("button", "Create Assets").click();
      cy.wait("@postAssets");
    });
  });

  describe("Invalid Data Handling", () => {
    beforeEach(() => {
      cy.visit("/assets/new");
    });

    it("should handle empty asset ID", () => {
      // Fill only interest rate
      cy.get('input[name="assets.0.interestRate"]').clear().type("5.5");
      cy.contains("button", "Create Assets").click();

      // Should not submit
      cy.get("form").should("exist");
    });

    it("should handle empty interest rate", () => {
      // Fill only ID
      cy.get('input[name="assets.0.id"]').clear().type("ASSET-001");
      cy.contains("button", "Create Assets").click();

      // Should not submit
      cy.get("form").should("exist");
    });

    it("should handle negative interest rate in form", () => {
      cy.fillAssetForm(0, "ASSET-001", -5.5);

      // Field should accept the value (validation happens on submit)
      cy.get('input[name="assets.0.interestRate"]').should(
        "have.value",
        "-5.5",
      );
    });

    it("should handle very large interest rates", () => {
      cy.fillAssetForm(0, "ASSET-001", 9999999.99);
      cy.get('input[name="assets.0.interestRate"]').should(
        "have.value",
        "9999999.99",
      );
    });
  });

  describe("Malformed API Responses", () => {
    it("should handle missing average_interest_rate field", () => {
      cy.intercept("GET", "**/interest_rate", {
        statusCode: 200,
        body: {}, // Missing expected field
      }).as("getAverageInterestRate");

      cy.visit("/");
      cy.wait("@getAverageInterestRate");

      // Should show default state or handle gracefully
      cy.contains("Average Interest Rate").should("be.visible");
    });

    it("should handle null average interest rate", () => {
      cy.intercept("GET", "**/interest_rate", {
        statusCode: 200,
        body: { average_interest_rate: null },
      }).as("getAverageInterestRate");

      cy.visit("/");
      cy.wait("@getAverageInterestRate");

      cy.contains("--").should("be.visible");
    });

    it("should handle string instead of number for interest rate", () => {
      cy.intercept("GET", "**/interest_rate", {
        statusCode: 200,
        body: { average_interest_rate: "invalid" },
      }).as("getAverageInterestRate");

      cy.visit("/");
      cy.wait("@getAverageInterestRate");

      // Should handle type mismatch gracefully
      cy.contains("Average Interest Rate").should("be.visible");
    });
  });
});
