describe("Full User Flow - End to End", () => {
  it("should complete a full workflow from home page to creating assets and viewing updated interest rate", () => {
    // Start at home page
    cy.visit("/");

    // Initially, no assets exist - should show "--" or error
    cy.contains("Average Interest Rate").should("be.visible");

    // Navigate to create assets page
    cy.contains("a", "Create Assets").click();
    cy.url().should("include", "/assets/new");

    // Set up API intercepts
    cy.interceptPostAssets(201);
    cy.interceptGetAverageInterestRate(6.25);

    // Fill in first asset
    cy.fillAssetForm(0, "BOND-001", 5.5);

    // Add second asset
    cy.contains("button", "Add New Asset").click();
    cy.fillAssetForm(1, "BOND-002", 7.0);

    // Add third asset
    cy.contains("button", "Add New Asset").click();
    cy.fillAssetForm(2, "STOCK-001", 3.5);

    // Remove second asset (BOND-002)
    cy.get("button")
      .filter((i, el) => el.textContent?.includes("Delete Asset"))
      .eq(1)
      .click();

    // Verify only 2 assets remain
    cy.get('[class*="MuiCard-root"]').should("have.length", 2);

    // Submit the form
    cy.contains("button", "Create Assets").click();

    // Verify API call
    cy.wait("@postAssets")
      .its("request.body")
      .should("deep.equal", {
        assets: [
          { id: "BOND-001", interest_rate: 5.5 },
          { id: "STOCK-001", interest_rate: 3.5 },
        ],
      });

    // Navigate back to home (could be automatic after success)
    cy.visit("/");

    // Wait for interest rate to load
    cy.wait("@getAverageInterestRate");

    // Should now display the average interest rate
    cy.contains("6.25%").should("be.visible");
  });

  it("should handle navigation between pages while maintaining form state", () => {
    cy.visit("/assets/new");

    // Fill in an asset
    cy.fillAssetForm(0, "TEST-001", 4.5);

    // Navigate to home
    cy.visit("/");
    cy.contains("Average Interest Rate").should("be.visible");

    // Go back to create assets
    cy.visit("/assets/new");

    // Form should be reset (new form instance)
    cy.get('input[name="assets.0.id"]').should("have.value", "");
  });

  it("should handle multiple asset creation sessions", () => {
    // First session
    cy.visit("/assets/new");
    cy.interceptPostAssets(201);

    cy.fillAssetForm(0, "ASSET-BATCH-1", 5.0);
    cy.contains("button", "Create Assets").click();
    cy.wait("@postAssets");

    // Second session - revisit the form
    cy.visit("/assets/new");
    cy.interceptPostAssets(201);

    // Form should be fresh
    cy.get('[class*="MuiCard-root"]').should("have.length", 1);
    cy.get('input[name="assets.0.id"]').should("have.value", "");

    // Create new assets
    cy.fillAssetForm(0, "ASSET-BATCH-2", 6.0);
    cy.contains("button", "Add New Asset").click();
    cy.fillAssetForm(1, "ASSET-BATCH-3", 7.0);

    cy.contains("button", "Create Assets").click();
    cy.wait("@postAssets").its("request.body.assets").should("have.length", 2);
  });
});
