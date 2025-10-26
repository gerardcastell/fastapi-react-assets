/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to fill in an asset form
       * @example cy.fillAssetForm(0, 'ASSET-001', 5.5)
       */
      fillAssetForm(
        index: number,
        id: string,
        interestRate: number,
      ): Chainable<void>;

      /**
       * Custom command to intercept the GET average interest rate API call
       * @example cy.interceptGetAverageInterestRate(3.5)
       */
      interceptGetAverageInterestRate(
        rate?: number,
        statusCode?: number,
      ): Chainable<void>;

      /**
       * Custom command to intercept the POST assets API call
       * @example cy.interceptPostAssets()
       */
      interceptPostAssets(statusCode?: number): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "fillAssetForm",
  (index: number, id: string, interestRate: number) => {
    cy.get(`input[name="assets.${index}.id"]`).clear().type(id);
    cy.get(`input[name="assets.${index}.interestRate"]`)
      .clear()
      .type(interestRate.toString());
  },
);

Cypress.Commands.add(
  "interceptGetAverageInterestRate",
  (rate?: number, statusCode: number = 200) => {
    if (rate !== undefined) {
      cy.intercept("GET", "**/interest_rate", {
        statusCode,
        body: { average_interest_rate: rate },
      }).as("getAverageInterestRate");
    } else {
      cy.intercept("GET", "**/interest_rate", {
        statusCode: statusCode || 404,
        body: { detail: "No assets found" },
      }).as("getAverageInterestRate");
    }
  },
);

Cypress.Commands.add("interceptPostAssets", (statusCode: number = 201) => {
  cy.intercept("POST", "**/asset", {
    statusCode,
    body: { message: "Assets created successfully" },
  }).as("postAssets");
});

export {};
