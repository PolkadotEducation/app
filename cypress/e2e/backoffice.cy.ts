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

    it("admin user can add and update challenges", () => {
      loginAsAdmin();
      cy.visit("/backoffice/challenges/new");

      // test required fields
      cy.getByData("button-challenge-submit").click();
      const expectedMessages = [
        "Question is required",
        "Language is required",
        "First 2 choices are required",
        "Correct choice must correspond to a non-empty choice",
      ];

      cy.get(".form-error").should(($errors) => {
        expect($errors).to.have.length(expectedMessages.length);

        $errors.each((index, errorElement) => {
          expect(errorElement.textContent?.trim()).to.equal(expectedMessages[index]);
        });
      });

      // test challenge creation
      cy.get("#questionInput").type("What's the capital of France?");
      cy.get("#easyRadioButton").click();
      cy.get("#Choice1").type("Lisbon");
      cy.get("#Choice2").type("Paris");
      cy.get("#Choice3").type("London");
      cy.get(":nth-child(2) > .items-center > .ml-1").click();

      // test language selection options
      cy.getByData("language-select").click();

      cy.getByData("language-option-english").should("be.visible").and("contain", "English");
      cy.getByData("language-option-spanish").should("be.visible").and("contain", "Español");
      cy.getByData("language-option-portuguese").should("be.visible").and("contain", "Português");

      cy.getByData("language-option-spanish").click();
      cy.getByData("language-select").should("contain", "Español");

      cy.getByData("language-select").click();
      cy.getByData("language-option-portuguese").click();
      cy.getByData("language-select").should("contain", "Português");

      // select English for the final lesson creation
      cy.getByData("language-select").click();
      cy.getByData("language-option-english").click();

      cy.getByData("button-challenge-submit").click();

      cy.url().should("include", "/backoffice/challenges");

      // test challenge update
      cy.contains("What's the capital of France?").parent().parent().getByData("button-challenge-edit").first().click();
      cy.url().should("include", "/backoffice/challenges");

      cy.get("#questionInput").clear();
      cy.get("#questionInput").type("Updated challenge question");
      cy.getByData("button-challenge-submit").click();

      cy.url().should("include", "/backoffice/challenges");
      cy.contains("Updated challenge question").should("be.visible");
    });

    it("admin user can add and update lessons", () => {
      loginAsAdmin();

      // first create a challenge for the lesson
      cy.visit("/backoffice/challenges/new");
      cy.get("#easyRadioButton").click();
      cy.get("#questionInput").type("What's the capital of Spain?");
      cy.getByData("language-select").click();
      cy.getByData("language-option-english").click();
      cy.get("#Choice1").type("Madrid");
      cy.get("#Choice2").type("Barcelona");
      cy.get("#Choice3").type("Valencia");
      cy.get(":nth-child(1) > .items-center > .ml-1").click();
      cy.getByData("button-challenge-submit").click();

      // create the lesson
      cy.visit("/backoffice/lessons/new");

      // test required fields
      cy.getByData("button-lesson-submit").click();
      const expectedMessages = [
        "Title is required",
        "Slug is required",
        "Language is required",
        "Challenge is required",
      ];

      cy.get(".form-error").should(($errors) => {
        expect($errors).to.have.length(expectedMessages.length);

        $errors.each((index, errorElement) => {
          expect(errorElement.textContent?.trim()).to.equal(expectedMessages[index]);
        });
      });

      // test language selection options
      cy.getByData("language-select").click();

      cy.getByData("language-option-english").should("be.visible").and("contain", "English");
      cy.getByData("language-option-spanish").should("be.visible").and("contain", "Español");
      cy.getByData("language-option-portuguese").should("be.visible").and("contain", "Português");

      cy.getByData("language-option-spanish").click();
      cy.getByData("language-select").should("contain", "Español");

      cy.getByData("language-select").click();
      cy.getByData("language-option-portuguese").click();
      cy.getByData("language-select").should("contain", "Português");

      // select english for the final lesson creation
      cy.getByData("language-select").click();
      cy.getByData("language-option-english").click();

      cy.get("#titleInput").type("New Lesson Title");

      // select challenge
      cy.getByData("challenge-select").click();
      cy.getByData("difficulty-filter-easy").click();
      cy.getByData("challenge-search").type("What's the capital of Spain?");
      cy.contains("What's the capital of Spain?").click();

      cy.getByData("button-lesson-submit").click();

      cy.url().should("include", "/backoffice/lessons");
      cy.contains("New Lesson Title").should("be.visible");

      // test lesson update
      cy.contains("New Lesson Title").parent().parent().getByData("button-lesson-edit").first().click();
      cy.url().should("include", "/backoffice/lessons");

      cy.get("#titleInput").clear();
      cy.get("#titleInput").type("Updated Lesson Title");
      cy.getByData("button-lesson-submit").click();

      cy.url().should("include", "/backoffice/lessons");
      cy.contains("Updated Lesson Title").should("be.visible");
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
