describe('Autenticación en el sistema', () => {
    it('Debe iniciar sesión con credenciales válidas', () => {
        cy.wrap("having-metal@a1clh5y8.mailosaur.net").as("mail")
        cy.wrap("1234").as("password")
        cy.wrap("a1clh5y8").as("serverid")

        cy.visit("http://localhost:5173/login").then(() => {
            cy.get("@mail").then(email => {
                cy.get("@password").then(password => {
                    cy.wait(2000)
                    cy.get("#email").should("exist").type(email)
                    cy.get("#password").should("exist").type(password)

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
            })
        })
    });
});
