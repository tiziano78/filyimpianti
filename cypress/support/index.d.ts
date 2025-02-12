/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // Aggiungi qui i comandi personalizzati se necessario
    login(email: string, password: string): Chainable<void>
    dataCy(value: string): Chainable<Element>
  }
} 