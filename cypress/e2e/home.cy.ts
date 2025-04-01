/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the hero section', () => {
    cy.get('h1').should('be.visible')
  })

  it('should navigate to configurator', () => {
    cy.get('[data-cy="config-button"]').click()
    cy.url().should('include', '/configuratore')
    cy.get('[data-cy="configurator-map"]').should('exist')
  })

  it('should show contact form', () => {
    cy.get('[data-cy="contact-button"]').click()
    cy.get('form').should('be.visible')
  })
}) 