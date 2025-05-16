describe('Validación de reserva', () => {
    it('Debe permitir hacer una reserva con datos válidos', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5NkQxRDBDNTg5IiwiaWF0IjoxNzQ3MjgwMjA0LCJleHAiOjQzMzkyODAyMDR9.MsHivo4q8CFMBpWs26PBsi-FSRKkOETfXvFXnxGf_7k";
        const user = {"id":"196D1D0C589","name":"Andres Caicedo","email":"andres.caicedo08@usc.edu.co","role":"admin"};

        cy.wrap(token).as("token")
        cy.wrap(user).as("user")

        cy.get("@token").then((token) => {
            cy.get("@user").then(user => {
                cy.visit('http://localhost:5173/reservar', {
                    onBeforeLoad(win) {
                        win.localStorage.setItem('token', token);
                        win.localStorage.setItem('user', JSON.stringify(user));
                    }
                });  // ⚠️ Ajusta la URL según tu sistema

                cy.get("#space").select('AMX')
                cy.get("#title").type("ASD")
                cy.get("#description").type("H")

                cy.get("#date").type("2025-05-16")
                cy.get("#start-time").type("19:30")
                cy.get("#end-time").type("21:30")

                cy.get("#attendees").clear().type("256")

                cy.get("#purpose").select('otro')
                cy.get("#requires-tech").check()

                cy.contains("Enviar Solicitud").click()
            })
        })
    });
});
