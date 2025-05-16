describe('Visitar calendario', () => {
    it('Debe mostrar la pagina de calendario de reservas', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5NkQxRDBDNTg5IiwiaWF0IjoxNzQ3MjgwMjA0LCJleHAiOjQzMzkyODAyMDR9.MsHivo4q8CFMBpWs26PBsi-FSRKkOETfXvFXnxGf_7k";
        const user = {"id":"196D1D0C589","name":"Andres Caicedo","email":"andres.caicedo08@usc.edu.co","role":"user"};

        cy.wrap(token).as("token")
        cy.wrap(user).as("user")

        cy.get("@token").then((token) => {
            cy.get("@user").then(user => {
                cy.visit('http://localhost:5173/calendario', {
                    onBeforeLoad(win) {
                        win.localStorage.setItem('token', token);
                        win.localStorage.setItem('user', JSON.stringify(user));
                    }
                });  // ⚠️ Ajusta la URL según tu sistema
            })
        })
    });
});
