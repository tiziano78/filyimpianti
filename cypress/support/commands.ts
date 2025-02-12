/// <reference types="cypress" />

Cypress.Commands.add('dataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`)
})

export {} 