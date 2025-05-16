describe('Autenticación en el sistema', () => {
    it('Debe iniciar sesión con credenciales válidas', () => {
        cy.request('POST', 'http://localhost:8080/api/v1/auth/login', {  // ⚠️ Ajusta la URL según tu backend
            email: 'andres.caicedo08@usc.edu.co',
            password: '1234'
        }).then((response) => {
            expect(response.status).to.eq(200);  // ✅ Verifica que la respuesta del servidor sea exitosa
            const token = response.body.token;
            cy.wrap(token).as("token")

            cy.request({
                method: "GET",
                url: "http://localhost:8080/api/v1/@me",
                headers: {
                    Authorization: token
                }
            }).then(self => {
                const { id, first_name, last_name, credentials, role } = self.body.user;
                const user = {
                    id,
                    name: `${first_name} ${last_name}`,
                    role,
                    email: credentials.email
                }

                cy.wrap(user).as("user")
            })
        });

        // Visitar el dashboard después del login - Espera
        cy.get("@token").then((token) => {
            cy.get("@user").then(user => {
                cy.visit('http://localhost:5173/dashboard', {
                    onBeforeLoad(win) {
                        win.localStorage.setItem('token', token);
                        win.localStorage.setItem('user', JSON.stringify(user));
                    }
                });
            })
        })
    });
});
