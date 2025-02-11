describe("The Home Page", () => {
  it("successfully loads", () => {
    const checkLoginSuccess = () => {
      cy.getByData("text-home-courses").should("be.visible");
    };

    cy.login("regular@seed.com", "Senha123");
    checkLoginSuccess();

    cy.getByData("link-course-home").first().find("div.cursor-pointer").first().click();
    cy.getByData("button-start-course").click();

    cy.getByData("aside-course-progress-details").should("be.visible");

    cy.getByData("aside-module-1").click();
    cy.getByData("aside-module-2").click();
    cy.getByData("aside-module-3").click();

    for (var i = 0; i < 3; i++) {
      cy.getByData("input-choice-0").click();
      cy.getByData("button-submit-answer").click();
      cy.getByData("button-next-lesson")
        .invoke("attr", "href")
        .then((nextLessonUrl) => {
          cy.getByData("button-next-lesson").click();
          cy.url().should("include", nextLessonUrl);
        });
    }
    cy.getByData("aside-course-progress-details").should("be.visible");
    cy.getByData("aside-module-1").should("be.visible");
    cy.getByData("aside-module-1").click();
  });
});
