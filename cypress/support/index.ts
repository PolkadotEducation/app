import "./commands";

before(() => {
  cy.task("dropDatabase");
});
