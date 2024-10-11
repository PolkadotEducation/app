describe("Sign-up", () => {
  describe("mobile", () => {
    it("creates an account with success", () => {
      cy.viewport("iphone-x");
      cy.visit("/");

      cy.getByData("button-login-signup").click();

      cy.get("#nameInput").type("Douglas Adams");
      cy.get("#emailInput").type("marvin@email.com");
      cy.get("#companyInput").type("Galaxy Hitchhiker");
      cy.get("#passwordInput").type("Senha123");
      cy.get("#passwordRepeatedInput").type("Senha123");

      cy.getByData("button-signup-submit").click();

      cy.login("marvin@email.com", "Senha123");

      cy.getByData("text-home-courses").should("be.visible");
    });

    it("displays error because account already exists", () => {
      cy.viewport("iphone-x");
      cy.visit("/");

      cy.getByData("button-login-signup").click();

      cy.get("#nameInput").type("Douglas Adams");
      cy.get("#emailInput").type("marvin@email.com");
      cy.get("#companyInput").type("Galaxy Hitchhiker");
      cy.get("#passwordInput").type("Senha123");
      cy.get("#passwordRepeatedInput").type("Senha123");

      cy.getByData("button-signup-submit").click();
      cy.getByData("text-signup-error").should("be.visible");
    });
  });
});
