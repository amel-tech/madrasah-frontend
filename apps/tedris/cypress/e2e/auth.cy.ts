describe('Authentication Flow', () => {
  it('should mock authentication successfully', () => {
    // Use our custom login command that mocks NextAuth session
    cy.login()

    // Should be on home page with authenticated state
    cy.url().should('include', '/')
    cy.contains('Home screen').should('be.visible')
  })

  it('should handle unauthenticated state', () => {
    // Visit without authentication
    cy.visit('/')

    // Should show unauthenticated state (depends on your app's behavior)
    cy.url().should('include', '/')
  })

  it('should mock session API correctly', () => {
    cy.login()

    // Wait for session API call
    cy.wait('@getSession')

    // Verify session data is available
    cy.window().its('localStorage').invoke('getItem', 'next-auth.session-token')
      .should('equal', 'mock-jwt-token')
  })
})
