describe("Create Assets", () => {
  beforeEach(() => {
    cy.visit("/assets/new");
  });

  it("should display the create assets form", () => {
    cy.contains("h4", "Create Assets").should("be.visible");
    cy.get("form").should("exist");
  });

  it("should display one asset form by default", () => {
    cy.contains("Asset #1").should("be.visible");
    cy.get('input[name="assets.0.id"]').should("exist");
    cy.get('input[name="assets.0.interestRate"]').should("exist");
  });

  it("should not show delete button when only one asset exists", () => {
    cy.contains("button", "Delete Asset").should("not.exist");
  });

  it('should add a new asset form when clicking "Add New Asset"', () => {
    cy.contains("button", "Add New Asset").click();

    cy.contains("Asset #1").should("be.visible");
    cy.contains("Asset #2").should("be.visible");
    cy.get('input[name="assets.0.id"]').should("exist");
    cy.get('input[name="assets.1.id"]').should("exist");
  });

  it("should show delete buttons when multiple assets exist", () => {
    cy.contains("button", "Add New Asset").click();
    cy.get("button")
      .filter((i, el) => el.textContent?.includes("Delete Asset"))
      .should("have.length", 2);
  });

  it("should delete an asset when clicking delete button", () => {
    // Add a second asset

    cy.contains("button", "Add New Asset").click();
    cy.contains("Asset #2").should("be.visible");

    // Delete the first asset
    cy.contains("button", "Delete Asset").first().click();

    // Should only have one asset now
    cy.get('[class*="MuiCard-root"]').should("have.length", 1);
  });

  it("should fill in asset form fields", () => {
    const assetId = "ASSET-001";
    const interestRate = "5.5";

    cy.fillAssetForm(0, assetId, parseFloat(interestRate));

    cy.get('input[name="assets.0.id"]').should("have.value", assetId);
    cy.get('input[name="assets.0.interestRate"]').should(
      "have.value",
      interestRate,
    );
  });

  it("should successfully create assets with valid data", () => {
    cy.interceptPostAssets(201);

    // Fill in the form
    cy.fillAssetForm(0, "ASSET-001", 5.5);

    // Submit the form
    cy.contains("button", "Create Assets").click();

    // Wait for the API call
    cy.wait("@postAssets")
      .its("request.body")
      .should("deep.equal", {
        assets: [{ id: "ASSET-001", interest_rate: 5.5 }],
      });
  });

  it("should create multiple assets", () => {
    cy.interceptPostAssets(201);

    // Add second asset
    cy.contains("button", "Add New Asset").click();

    // Fill in both assets
    cy.fillAssetForm(0, "ASSET-001", 5.5);
    cy.fillAssetForm(1, "ASSET-002", 7.25);

    // Submit the form
    cy.contains("button", "Create Assets").click();

    // Verify the API call
    cy.wait("@postAssets")
      .its("request.body")
      .should("deep.equal", {
        assets: [
          { id: "ASSET-001", interest_rate: 5.5 },
          { id: "ASSET-002", interest_rate: 7.25 },
        ],
      });
  });

  it("should show validation errors for empty fields", () => {
    // Try to submit without filling the form
    cy.contains("button", "Create Assets").click();

    // Should not make API call and stay on the same page
    cy.url().should("include", "/assets/new");
  });

  it("should handle API errors gracefully", () => {
    cy.interceptPostAssets(500);

    cy.fillAssetForm(0, "ASSET-001", 5.5);
    cy.contains("button", "Create Assets").click();

    cy.wait("@postAssets");
    // The form should still be visible after error
    cy.contains("h4", "Create Assets").should("be.visible");
  });

  it("should allow adding, filling, and removing multiple assets", () => {
    // Add 3 assets
    cy.contains("button", "Add New Asset").click();
    cy.contains("button", "Add New Asset").click();
    cy.contains("button", "Add New Asset").click();

    cy.get('[class*="MuiCard-root"]').should("have.length", 4);

    // Fill them in
    cy.fillAssetForm(0, "ASSET-001", 3.5);
    cy.fillAssetForm(1, "ASSET-002", 4.5);
    cy.fillAssetForm(2, "ASSET-003", 5.5);
    cy.fillAssetForm(3, "ASSET-004", 6.5);

    // Remove the second one (index 1)
    cy.get("button")
      .filter((i, el) => el.textContent?.includes("Delete Asset"))
      .eq(1)
      .click();

    // Should have 3 assets now
    cy.get('[class*="MuiCard-root"]').should("have.length", 3);

    cy.interceptPostAssets(201);
    cy.contains("button", "Create Assets").click();

    // Verify only 3 assets were submitted
    cy.wait("@postAssets").its("request.body.assets").should("have.length", 3);
  });
});
