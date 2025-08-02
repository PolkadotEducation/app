/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getByData(_dataCyValue: string): Chainable<Element>;
    login(_email?: string, _password?: string): Chainable<void>;
    task(_event: "getUserVerificationToken", _email: string): Chainable<string | null>;
    task(_event: "deleteUser", _email: string): Chainable<boolean>;
  }
}

Cypress.Commands.add("getByData", (dataCyValue: string) => {
  cy.get(`[data-cy="${dataCyValue}"]`);
});

Cypress.Commands.add("login", (_email?: string, _password?: string) => {
  const email = _email || "admin@seed.com";
  const password = _password || "Senha123";

  cy.visit("/");
  cy.get("#emailInput").type(email);
  cy.get("#passwordInput").type(password);
  cy.getByData("button-login-submit").click();
});
