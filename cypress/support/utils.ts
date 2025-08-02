export const checkLoginSuccess = () => {
  cy.getByData("text-home-courses").should("be.visible");
};

export const loginAsAdmin = () => {
  cy.session("admin-user", () => {
    cy.login(); // Uses default admin@seed.com credentials
    checkLoginSuccess();
  });
};

export const loginAsRegular = () => {
  cy.session("regular-user", () => {
    cy.login("regular@seed.com", "Senha123");
    checkLoginSuccess();
  });
};
