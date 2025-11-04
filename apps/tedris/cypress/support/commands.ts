/// <reference types="cypress" />

// Custom commands for Tedris app testing

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with mock credentials
       */
      login(): Chainable<void>

      /**
       * Custom command to create a flashcard deck
       */
      createDeck(title: string, description?: string): Chainable<void>

      /**
       * Custom command to create a flashcard
       */
      createCard(deckId: number, front: string, back: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  // Mock NextAuth session instead of going through actual login flow
  cy.window().then((win) => {
    // Mock NextAuth session in localStorage
    const mockSession = {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@madrasah.com',
        sub: 'test-user-id',
        email_verified: true,
        preferred_username: 'testuser',
        given_name: 'Test',
        family_name: 'User',
      },
      accessToken: 'mock-access-token',
      idToken: 'mock-id-token',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }
    
    // Set NextAuth session token
    win.localStorage.setItem('next-auth.session-token', 'mock-jwt-token')
    
    // Mock the session API endpoint
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: mockSession,
    }).as('getSession')
  })
  
  // Visit home page which should now show authenticated state
  cy.visit('/')
})

Cypress.Commands.add('createDeck', (title: string, description = 'Test deck description') => {
  cy.get('[data-testid="create-deck-button"]').click()
  cy.get('[data-testid="deck-title-input"]').type(title)
  cy.get('[data-testid="deck-description-input"]').type(description)
  cy.get('[data-testid="save-deck-button"]').click()
})

Cypress.Commands.add('createCard', (deckId: number, front: string, back: string) => {
  cy.visit(`/decks/${deckId}`)
  cy.get('[data-testid="create-card-button"]').click()
  cy.get('[data-testid="card-front-input"]').type(front)
  cy.get('[data-testid="card-back-input"]').type(back)
  cy.get('[data-testid="save-card-button"]').click()
})
