describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the home page with correct content", () => {
    // Check if the main description is visible
    cy.contains("This is a simple assets manager").should("be.visible");
    cy.contains("track your assets and their values").should("be.visible");
  });

  it('should display the "Create Assets" button', () => {
    cy.contains("a", "Create Assets").should("be.visible");
  });

  it('should navigate to asset creation page when clicking "Create Assets" button', () => {
    cy.contains("a", "Create Assets").click();
    cy.url().should("include", "/assets/new");
    cy.contains("Create Assets").should("be.visible");
  });

  it("should display the average interest rate section", () => {
    cy.contains("Average Interest Rate").should("be.visible");
  });

  it("should display instructions text", () => {
    cy.contains(
      "You can create assets and obtain the average interest rate",
    ).should("be.visible");
  });
});
