import { loginAsAdmin, loginAsRegular } from "../support/utils";

describe("Backoffice Page", () => {
  describe("desktop", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    // it("admin user can access backoffice home through menu", () => {
    //   loginAsAdmin();

    //   cy.visit("/");
    //   cy.getByData("button-header-menu-desktop").click();
    //   cy.getByData("link-header-backoffice").click();

    //   cy.getByData("image-backoffice-lessons").should("be.visible");
    //   cy.getByData("image-backoffice-courses").should("be.visible");
    // });

    // it("admin user can access backoffice home through url", () => {
    //   loginAsAdmin();

    //   cy.visit("/backoffice");
    //   cy.getByData("image-backoffice-lessons").should("be.visible");
    //   cy.getByData("image-backoffice-courses").should("be.visible");
    // });

    it("admin user can add and update challenges", () => {
      loginAsAdmin();
      cy.visit("/backoffice/challenges/new");

      // test required fields
      cy.getByData("button-challenge-submit").click();
      const expectedMessages = [
        "Difficulty is required",
        "Question is required",
        "First 2 choices are required",
        "Language is required",
      ];

      cy.get(".form-error").should(($errors) => {
        expect($errors).to.have.length(expectedMessages.length);

        $errors.each((index, errorElement) => {
          expect(errorElement.textContent?.trim()).to.equal(expectedMessages[index]);
        });
      });

      // test challenge creation
      cy.get("#titleInput").type("New Challenge Title");
      cy.get("#easyRadioButton").click();
      cy.get("#questionInput").type("What's the capital of France?");
      cy.get("#Choice1").type("Lisbon");
      cy.get("#Choice2").type("Paris");
      cy.get("#Choice3").type("London");
      cy.get(":nth-child(2) > .items-center > .ml-1").click();

      cy.getByData("button-challenge-submit").click();

      cy.url().should("include", "/backoffice/challenges");
      cy.contains("New Challenge Title").should("be.visible");

      // test challenge update
      cy.contains("New Challenge Title").parent().parent().getByData("button-challenge-edit").first().click();
      cy.url().should("include", "/backoffice/challenges");

      cy.get("#titleInput").clear();
      cy.get("#titleInput").type("Updated challenge title");
      cy.getByData("button-challenge-submit").click();

      cy.url().should("include", "/backoffice/challenges");
      cy.contains("Updated challenge title").should("be.visible");
    });

    it("admin user can add and update lessons", () => {
      loginAsAdmin();
      cy.visit("/backoffice/lessons/new");

      // test required fields
      cy.getByData("button-lesson-submit").click();
      const expectedMessages = [
        "Title is required",
        "Slug is required",
        "Language is required",
        "Difficulty is required",
        "Challenge is required",
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

      // First create a challenge for the lesson
      cy.visit("/backoffice/challenges/new");
      cy.get("#titleInput").type("Test Challenge for Lesson");
      cy.get("#easyRadioButton").click();
      cy.get("#questionInput").type("What's the capital of Spain?");
      cy.get("#Choice1").type("Madrid");
      cy.get("#Choice2").type("Barcelona");
      cy.get("#Choice3").type("Valencia");
      cy.get(":nth-child(1) > .items-center > .ml-1").click();
      cy.getByData("button-challenge-submit").click();

      // Now create the lesson
      cy.visit("/backoffice/lessons/new");
      cy.get("#titleInput").type("New Lesson Title");
      cy.get("#easyRadioButton").click();

      // Select challenge
      cy.get('[data-testid="challenge-select"]').click();
      cy.contains("Test Challenge for Lesson").click();

      cy.getByData("button-lesson-submit").click();

      cy.url().should("include", "/backoffice/lessons");
      cy.contains("New Lesson Title").should("be.visible");

      // test lesson update
      cy.contains("New Lesson Title").parent().parent().getByData("button-lesson-edit").first().click();
      cy.url().should("include", "/backoffice/lessons");

      cy.get("#titleInput").clear();
      cy.get("#titleInput").type("Updated lesson title");
      cy.getByData("button-lesson-submit").click();

      cy.url().should("include", "/backoffice/lessons");
      cy.contains("Updated lesson title").should("be.visible");
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
