describe('Registro de Usuario con Selección Mejorada', () => {
    it('Debe encontrar el campo "nombre" y completar el formulario', () => {
        cy.visit('http://localhost:5173/registro');
        cy.wrap("having-metal@a1clh5y8.mailosaur.net").as("mail")
        cy.wrap("a1clh5y8").as("serverid")

        // Esperar que la página cargue completamente
        cy.wait(2000);

        cy.get("@mail").then(email => {
            cy.get("#name").should("exist").type("Nombre");
            cy.get("#lastName").should("exist").type("Apellido");
            cy.get("#email").should("exist").type(email);
            cy.get("#password").should("exist").type("1234");
            cy.get("#confirmPassword").should("exist").type("1234");
            cy.get("button[type=submit]").should("exist").click()

            cy.wait(10000)
            cy.get("@serverid").then(serverId => {
                cy.task("getLastMail", serverId, email).then(code => {
                    cy.wait(2000)
                    cy.get("#verificationCode").should("exist").type(code)

                    cy.get("button[type=submit]").should("exist").click()
                })
            })
        })
    });
});
