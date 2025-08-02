import { loginAsAdmin, loginAsRegular } from "../support/utils";

describe("Backoffice Page", () => {
  describe("desktop", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("admin user can access backoffice home through menu", () => {
      loginAsAdmin();

      cy.visit("/");
      cy.getByData("button-header-menu-desktop").click();
      cy.getByData("link-header-backoffice").click();

      cy.getByData("image-backoffice-lessons").should("be.visible");
      cy.getByData("image-backoffice-courses").should("be.visible");
    });

    it("admin user can access backoffice home through url", () => {
      loginAsAdmin();

      cy.visit("/backoffice");
      cy.getByData("image-backoffice-lessons").should("be.visible");
      cy.getByData("image-backoffice-courses").should("be.visible");
    });

    it("admin user can add lessons", () => {
      loginAsAdmin();
      cy.visit("/backoffice/lessons/new");

      // test required fields
      cy.getByData("button-lesson-submit").click();
      const expectedMessages = [
        "Title is required",
        "Slug is required",
        "Language is required",
        "Difficulty is required",
        "Question is required",
        "First 3 choices are required",
      ];

      cy.get(".form-error").should(($errors) => {
        expect($errors).to.have.length(expectedMessages.length);

        $errors.each((index, errorElement) => {
          expect(errorElement.textContent?.trim()).to.equal(expectedMessages[index]);
        });
      });

      // test language selection options
      cy.get('[data-testid="language-select"]').click();

      cy.get('[data-testid="language-option-english"]').should("be.visible").and("contain", "English");
      cy.get('[data-testid="language-option-spanish"]').should("be.visible").and("contain", "Español");
      cy.get('[data-testid="language-option-portuguese"]').should("be.visible").and("contain", "Português");

      cy.get('[data-testid="language-option-spanish"]').click();
      cy.get('[data-testid="language-select"]').should("contain", "Español");

      cy.get('[data-testid="language-select"]').click();
      cy.get('[data-testid="language-option-portuguese"]').click();
      cy.get('[data-testid="language-select"]').should("contain", "Português");

      // select English for the final lesson creation
      cy.get('[data-testid="language-select"]').click();
      cy.get('[data-testid="language-option-english"]').click();

      // test lesson creation
      cy.get("#titleInput").type("New Lesson Title");
      cy.get("#easyRadioButton").click();
      cy.get("#questionInput").type("What's the capital of France?");
      cy.get("#Choice1").type("Lisbon");
      cy.get("#Choice2").type("Paris");
      cy.get("#Choice3").type("London");
      cy.get(":nth-child(2) > .items-center > .ml-1").click();

      cy.getByData("button-lesson-submit").click();

      cy.url().should("include", "/backoffice/lessons");
      cy.contains("New Lesson Title").should("be.visible");
    });

    it("regular user can not access backoffice home", () => {
      loginAsRegular();

      cy.request({ url: "/backoffice", failOnStatusCode: false }).its("status").should("equal", 404);
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("NEXT_NOT_FOUND")) {
          return false;
        }
        return true;
      });

      cy.visit("/backoffice", { failOnStatusCode: false });
      cy.get(".next-error-h1").should("have.text", "404");
    });
  });
});
