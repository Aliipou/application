describe('CRUD App End-to-End Test', () => {
    it('Should add and delete an item', () => {
        cy.visit('http://localhost:3000'); // Your app's URL

        // Adding an item
        cy.get('input[placeholder="Name"]').type('Test Item');
        cy.get('input[placeholder="Description"]').type('Test Item Description');
        cy.get('input[placeholder="Price"]').type('100');
        cy.get('button').contains('Add Item').click();

        // Check if the item is added
        cy.contains('Test Item').should('exist');
        cy.contains('Test Item Description').should('exist');
        cy.contains('$100').should('exist');

        // Deleting the item
        cy.get('button').contains('Delete').click();

        // Ensure the item is removed
        cy.contains('Test Item').should('not.exist');
    });
});
