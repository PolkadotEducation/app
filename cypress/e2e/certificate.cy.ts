import { loginAsRegular } from "../support/utils";

describe("Certificate Page", () => {
  describe("mobile", () => {
    it("finishes a course and gets a certificate", () => {
      cy.viewport("iphone-x");
      loginAsRegular();
      cy.visit("/");

      cy.getByData("link-course-home").first().find("div.cursor-pointer").first().click();
      cy.getByData("button-start-course").click();

      // first 11 lessons
      for (var i = 0; i < 11; i++) {
        cy.getByData("input-choice-0").click();
        cy.getByData("button-submit-answer").click({ force: true });
        cy.getByData("button-next-lesson").click();
      }

      // final lesson
      cy.getByData("input-choice-0").click();
      cy.getByData("button-submit-answer").click({ force: true });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.getByData("button-finish-course").click();

      cy.getByData("text-congratulations").should("be.visible");
      cy.getByData("button-generate-certificate").click();

      cy.getByData("certificate").should("be.visible");
      cy.getByData("certificate").should("have.css", "background-image");
      cy.getByData("certificate").find('img[alt="Logo"]').should("be.visible");
      cy.getByData("certificate-user-name").should("contain.text", "Regular User");
      cy.getByData("certificate-course-title").should("be.visible");
    });
  });
});
