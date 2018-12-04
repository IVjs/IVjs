/// <reference types="Cypress" />

function xy(x: number, y: number, merge: object = {}) {
  return {
    ...merge,
    which: 1,
    x,
    y,
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
  };
}

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/demos/dragAndDrop.html');
  });

  // https://on.cypress.io/interacting-with-elements
  it('it changes the target highlight when hovered', () => {
    const blue = 'rgb(0, 0, 255)';
    cy.get('#target').should('have.css', 'border-color', blue);
    cy.get('#apple')
      .first()
      .trigger('mousedown')
      .trigger('mousemove', xy(200, 200, { force: true }))
      .trigger('mouseup', { force: true });

    // cy.get('#target').then(target => {
    //   cy.get('#apple').then(draggable => {
    //     expect(target[0].style.borderColor).not.to.eq(blue);
    //   });
    // });
  });
});
