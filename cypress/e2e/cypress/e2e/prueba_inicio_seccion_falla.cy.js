describe('Autenticación en el sistema (fallo esperado)', () => {
    it('Debe fallar el inicio de sesión con credenciales inválidas', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/auth/login',
            failOnStatusCode: false, // 🔹 Esto evita que Cypress detenga la prueba por error 4XX o 5XX
            body: {
                email: 'andres.caicedo08@usc.edu.co',
                password: 'clave_incorrecta'
            }
        }).then((response) => {
            expect(response.status).to.eq(401); // ✅ Verifica que la respuesta sea "No autorizado"
        });

        // Intentar acceder al dashboard sin autenticación
        cy.visit('http://localhost:5173/dashboard');
        cy.contains('Bienvenido').should('not.exist'); // ❌ La página no debe mostrar la bienvenida
    });
});
