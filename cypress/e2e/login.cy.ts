describe("Login Page Responsiveness and Functionality", () => {
  context("Desktop View - macbook-13", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
      cy.visit("localhost:3000");
    });

    // Verify that the logo is visible on the desktop view
    cy.getByData("image-logo").should("be.visible");

    // Simulate user input for email and password fields
    cy.get("#emailInput").type("test@test.com");
    cy.get("#passwordInput").type("RandomPassword@123");

    // Submit the login form and check for an error message
    cy.getByData("button-login-submit").click();
    cy.getByData("text-login-error").should("be.visible");

    // Ensure that the side image is visible on the desktop view
    cy.getByData("image-login-webinar").should("be.visible");
  });

  context("Mobile View - iphone-x", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    // Verify that the side image is hidden on the mobile view
    cy.getByData("image-login-webinar").should("not.be.visible");

    // Ensure that the logo is still visible on the mobile view
    cy.getByData("image-logo").should("be.visible");
  });
});
