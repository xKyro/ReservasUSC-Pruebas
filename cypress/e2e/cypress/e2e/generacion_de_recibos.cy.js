describe('Generación de Recibos', () => {
    it('Debe generar un recibo después de completar la reserva', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5NkQxRDBDNTg5IiwiaWF0IjoxNzQ3MjgwMjA0LCJleHAiOjQzMzkyODAyMDR9.MsHivo4q8CFMBpWs26PBsi-FSRKkOETfXvFXnxGf_7k";
        const user = {"id":"196D1D0C589","name":"Andres Caicedo","email":"andres.caicedo08@usc.edu.co","role":"admin"};

        cy.wrap(token).as("token")
        cy.wrap(user).as("user")

        cy.get("@token").then((token) => {
            cy.get("@user").then(user => {
                cy.visit('http://localhost:5173/receipts', {
                    onBeforeLoad(win) {
                        win.localStorage.setItem('token', token);
                        win.localStorage.setItem('user', JSON.stringify(user));
                    }
                });  // ⚠️ Ajusta la URL según tu sistema

                cy.get("select").select("21 de mayo de 2025 - Aula Máxima")
                cy.get("input").eq(0).type("Andres Caicedo")
                cy.get("input").eq(1).type("andres.caicedo08@usc.edu.co")
                cy.get("input").eq(2).type("50000")
                cy.get(".btn-generate").click()
            })
        })
    });
});
