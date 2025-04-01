/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

// Importa i comandi personalizzati
import './commands'

export {}