/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getByData(_dataCyValue: string): Chainable<Element>;
    login(_email: string, _password: string): Chainable<void>;
  }
}

Cypress.Commands.add("getByData", (dataCyValue: string): any => {
  return cy.get(`[data-cy="${dataCyValue}"]`);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("#emailInput").type(email);
  cy.get("#passwordInput").type(password);
  cy.getByData("button-login-submit").click();
});
