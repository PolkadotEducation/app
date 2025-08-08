import { loginAsRegular } from "../support/utils";

describe("Progress Summary Page", () => {
  it("successfully loads", () => {
    loginAsRegular();
    cy.visit("/");

    cy.getByData("link-course-home").first().find("div.cursor-pointer").first().click();
    cy.getByData("button-start-course").click();

    cy.getByData("aside-course-progress-details").should("be.visible");

    cy.getByData("aside-module-1").click();
    cy.getByData("aside-module-2").click();
    cy.getByData("aside-module-3").click();

    for (var i = 0; i < 3; i++) {
      cy.getByData("input-choice-0").click();
      cy.getByData("button-submit-answer").click();
      cy.getByData("button-next-lesson").should("not.be.disabled").click();
    }

    cy.getByData("aside-course-progress-details").should("be.visible");
    cy.getByData("aside-module-1").should("be.visible");
    cy.getByData("aside-module-1").click();
  });
});
