describe("Backoffice Page", () => {
  const checkLoginSuccess = () => {
    cy.getByData("text-home-courses").should("be.visible");
  };

  describe("desktop", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("admin user can access backoffice home through menu", () => {
      cy.login();

      cy.getByData("button-header-menu-desktop").click();
      cy.getByData("link-header-backoffice").click();

      cy.getByData("image-backoffice-lessons").should("be.visible");
      cy.getByData("image-backoffice-courses").should("be.visible");
    });

    it("admin user can access backoffice home through url", () => {
      cy.login();
      checkLoginSuccess();

      cy.visit("/backoffice");
      cy.getByData("image-backoffice-lessons").should("be.visible");
      cy.getByData("image-backoffice-courses").should("be.visible");
    });

    it("admin user can add lessons", () => {
      cy.login();
      checkLoginSuccess();

      cy.visit("/backoffice/lessons/new");
      cy.getByData("button-lesson-submit").click();

      const expectedMessages = [
        "Title is required",
        "Difficulty is required",
        "Question is required",
        "First 3 choices are required",
      ];

      cy.get(".form-error").should(($errors) => {
        expect($errors).to.have.length(expectedMessages.length);

        $errors.each((index, errorElement) => {
          expect(errorElement.textContent?.trim()).to.equal(expectedMessages[index]);
        });
      });

      cy.get("#titleInput").type("Lesson Title");
      cy.get("#easyRadioButton").click();
      cy.get("#questionInput").type("What's the capital of France?");
      cy.get("#Choice1").type("Lisbon");
      cy.get("#Choice2").type("Paris");
      cy.get("#Choice3").type("London");
      cy.get(":nth-child(2) > .items-center > .ml-1").click();

      cy.getByData("button-lesson-submit").click();

      cy.getByData("toast").should("be.visible");
      cy.getByData("toast-title").should("be.visible").and("contain", "Lesson created successfully!");
    });

    it("regular user can not access backoffice home", () => {
      cy.login("regular@seed.com", "Senha123");
      checkLoginSuccess();

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
