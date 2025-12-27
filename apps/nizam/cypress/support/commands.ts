/// <reference types="cypress" />

// Custom commands for Nizam app testing

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with mock credentials
       */
      login(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  // Mock NextAuth session for Nizam app
  cy.window().then((win) => {
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
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }
    
    win.localStorage.setItem('next-auth.session-token', 'mock-jwt-token')
    
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: mockSession,
    }).as('getSession')
  })
  
  cy.visit('/')
})
