import { checkLoginSuccess } from "../support/utils";

describe("Sign-up", () => {
  let testEmail: string;

  describe("mobile", () => {
    it("creates an account with success", () => {
      cy.viewport("iphone-x");

      // access through URL first
      cy.visit("/sign-up");
      cy.getByData("button-signup-submit").should("be.visible");

      // access through sign-up link on login page
      cy.visit("/");
      cy.getByData("button-login-signup").click();

      testEmail = "marvin@seed.com";

      cy.get("#nameInput").type("Douglas Adams");
      cy.get("#emailInput").type(testEmail);
      cy.get("#companyInput").type("Galaxy Hitchhiker");
      cy.get("#passwordInput").type("Senha123");
      cy.get("#passwordRepeatedInput").type("Senha123");

      cy.getByData("button-signup-submit").click();

      cy.url().should("include", "email-sent");
      cy.contains("Email Confirmation").should("be.visible");
      cy.contains("We have sent an email to").should("be.visible");
      cy.getByData("button-back-to-login").click();

      // simulate email verification
      cy.task("getUserVerificationToken", testEmail).then((token) => {
        if (token) {
          cy.visit(`/verify?email=${testEmail}&token=${token}`);
          cy.contains("You have verified your email").should("be.visible");
          cy.getByData("button-back-to-login").should("be.visible").click();
        } else {
          cy.task("deleteUser", testEmail);
          throw new Error(`No verification token found for ${testEmail}`);
        }
      });

      // login with the verified account
      cy.login(testEmail, "Senha123");
      checkLoginSuccess();
      cy.task("deleteUser", testEmail);
    });

    it("displays error because account already exists", () => {
      cy.viewport("iphone-x");
      cy.visit("/");
      cy.getByData("button-login-signup").click();

      // use an email that definitely exists from seed data
      cy.get("#nameInput").type("Douglas Adams");
      cy.get("#emailInput").type("admin@seed.com");
      cy.get("#companyInput").type("Galaxy Hitchhiker");
      cy.get("#passwordInput").type("Senha123");
      cy.get("#passwordRepeatedInput").type("Senha123");

      cy.getByData("button-signup-submit").click();
      cy.getByData("text-signup-error").should("be.visible");
    });
  });
});
