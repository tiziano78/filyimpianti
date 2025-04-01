/// <reference types="cypress" />

// Dichiara il namespace globale per estendere i comandi di Cypress
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Selettore personalizzato per gli elementi con attributo data-cy
     * @param selector - Il valore dell'attributo data-cy
     * @example cy.dataCy('submit-button')
     */
    dataCy(selector: string): Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('dataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`)
})

export {}