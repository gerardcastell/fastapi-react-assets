describe("Interest Rate Display", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the average interest rate component", () => {
    cy.contains("Average Interest Rate").should("be.visible");
  });

  it('should display "--" when no interest rate is available', () => {
    cy.interceptGetAverageInterestRate(undefined, 404);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("Average Interest Rate").should("be.visible");
    cy.contains("--").should("be.visible");
  });

  it("should display the average interest rate when available", () => {
    cy.interceptGetAverageInterestRate(5.75);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("5.75%").should("be.visible");
  });

  it("should format interest rate with 2 decimal places", () => {
    cy.interceptGetAverageInterestRate(3.333333);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("3.33%").should("be.visible");
  });

  it("should display loading state while fetching", () => {
    cy.intercept("GET", "**/interest_rate", (req) => {
      req.reply((res) => {
        res.setDelay(1000);
        res.send({ average_interest_rate: 5.5 });
      });
    }).as("getAverageInterestRate");

    cy.visit("/");

    // Should show loading indicator (CircularProgress)
    cy.get('[class*="MuiCircularProgress"]').should("be.visible");
  });

  it("should display error message when API call fails", () => {
    cy.intercept("GET", "**/interest_rate", {
      statusCode: 500,
      body: { error: "Internal server error" },
    }).as("getAverageInterestRate");

    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("Failed to load").should("be.visible");
  });

  it("should handle zero interest rate", () => {
    cy.interceptGetAverageInterestRate(0);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("0.00%").should("be.visible");
  });

  it("should handle negative interest rate", () => {
    cy.interceptGetAverageInterestRate(-2.5);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("-2.50%").should("be.visible");
  });

  it("should handle large interest rate values", () => {
    cy.interceptGetAverageInterestRate(99.99);
    cy.visit("/");
    cy.wait("@getAverageInterestRate");

    cy.contains("99.99%").should("be.visible");
  });
});
