describe("Login Page", () => {
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

  describe("mobile", () => {
    it("displays error on invalid login attempt", () => {
      cy.viewport("iphone-x");

      cy.login(invalidEmail, invalidPassword);

      checkLogoVisibility();
      checkLoginError();
    });
  });

  describe("desktop", () => {
    it("displays error on invalid login attempt", () => {
      cy.viewport("macbook-13");

      cy.login(invalidEmail, invalidPassword);

      checkLogoVisibility();
      checkLoginError();
    });
  });

  it("adjusts layout for different viewport sizes", () => {
    cy.visit("/");

    cy.viewport("iphone-x");
    checkWebinarImageVisibility(false);

    cy.viewport("macbook-13");
    checkWebinarImageVisibility(true);
  });
});
