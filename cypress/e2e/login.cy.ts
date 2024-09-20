describe("Login Page", () => {
  const baseUrl = "http://localhost:3000";
  const invalidEmail = "test@test.com";
  const invalidPassword = "RandomPassword@123";

  const checkLogoVisibility = () => {
    cy.getByData("image-logo").should("be.visible");
  };

  const checkLoginError = () => {
    cy.getByData("text-login-error").should("be.visible");
  };

  const checkWebinarImageVisibility = (shouldBeVisible: boolean) => {
    cy.getByData("image-login-webinar").should(shouldBeVisible ? "be.visible" : "not.be.visible");
  };

  it("displays error on invalid login attempt - mobile view", () => {
    cy.viewport("iphone-x");

    cy.login(invalidEmail, invalidPassword);

    checkLogoVisibility();
    checkLoginError();
    checkWebinarImageVisibility(false);
  });

  it("displays error on invalid login attempt - desktop view", () => {
    cy.viewport("macbook-13");

    cy.login(invalidEmail, invalidPassword);

    checkLogoVisibility();
    checkLoginError();
    checkWebinarImageVisibility(true);
  });

  it("adjusts layout for different viewport sizes", () => {
    cy.visit(baseUrl);

    cy.viewport("iphone-x");
    checkWebinarImageVisibility(false);

    cy.viewport("macbook-13");
    checkWebinarImageVisibility(true);
  });
});
