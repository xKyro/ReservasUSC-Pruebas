describe('Prueba de mi Proyecto', () => {
    it('Visita la página principal', () => {
        cy.visit('http://localhost:5173/login'); // ⚠️ Cambia la URL por la de tu proyecto
        cy.contains('Bienvenido');  // ⚡ Verifica que un texto específico aparece en la página
    });
});
