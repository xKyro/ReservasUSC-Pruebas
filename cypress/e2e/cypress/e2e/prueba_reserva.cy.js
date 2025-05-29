describe('Validación de reserva', () => {
    before(() => {
        cy.wrap("having-metal@a1clh5y8.mailosaur.net").as("mail")
        cy.wrap("1234").as("password")
        cy.wrap("a1clh5y8").as("serverid")

        cy.get("@mail").then(email => {
            cy.get("@password").then(password => {
                cy.get("@serverid").then(serverId => {
                    console.log(email, password)
                    cy.task("pretendLogin", {email, password}).then((loginRes) => {
                        cy.wait(10000)
                        cy.task("getLastMail", serverId, email).then(code => {
                            cy.task("pretendTFA", {email, code}).then((tfaRes) => {
                                console.log(tfaRes, email, code)
                                cy.wrap(tfaRes.token).as("token")
                            })
                        })
                    })
                })
            })
        })
    })
    it('Debe permitir hacer una reserva con datos válidos', () => {
        cy.window().then(win => {
            const user = {"id":"196D1D0C589","name":"Andres Caicedo","email":"andres.caicedo08@usc.edu.co","role":"user"};
            cy.wrap(user).as("user")

            cy.get("@token").then((token) => {
                cy.get("@user").then(user => {
                    cy.visit('http://localhost:5173/reservar', {
                        onBeforeLoad(win) {
                            win.localStorage.setItem('token', token);
                            win.localStorage.setItem('user', JSON.stringify(user));
                        }
                    });  // ⚠️ Ajusta la URL según tu sistema

                    cy.get("#space").select('AUC')
                    cy.get("#title").type("ASD")
                    cy.get("#description").type("H")

                    cy.get("#date").type("2025-06-25")
                    cy.get("#start-time").type("12:30")
                    cy.get("#end-time").type("14:30")

                    cy.get("#attendees").clear().type("50")

                    cy.get("#purpose").select('otro')
                    cy.get("#requires-tech").check()

                    cy.contains("Enviar Solicitud").click()
                })
            })
        })
    });
});
