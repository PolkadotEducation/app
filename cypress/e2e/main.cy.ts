describe("template spec", () => {
  it("passes", () => {
    cy.viewport("macbook-13")
    cy.visit("localhost:3000")

    // check if logo exists
    // @TODO: better metadata to identify components
    cy.get("img.cursor-pointer").should("be.visible")

    // input email and password
    cy.get("#emailInput").type("test@test.com")
    cy.get("#passwordInput").type("RandomPassword@123")

    // click submit
    // @TODO: better metadata to identify components
    cy.get(".bg-primary").click()

    // check if side image exists
    // @TODO: better metadata to identify components
    cy.get(".hidden").should("be.visible")

    cy.viewport("iphone-x")

    // check if side image was hidden
    // @TODO: better metadata to identify components
    cy.get(".hidden").should("not.be.visible")
  })
})
