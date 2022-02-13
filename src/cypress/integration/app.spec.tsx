export { };

it('asdf', () => {
  cy.visit('http://localhost:3000');
  cy.get('.InfoBlurb').should('have.text', 'Pick Format and Card Sets')
})