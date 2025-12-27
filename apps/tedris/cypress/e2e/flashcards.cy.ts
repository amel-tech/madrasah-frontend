describe('Flashcard Management', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('Deck Operations', () => {
    it('should create a new deck', () => {
      cy.visit('/cards')

      cy.get('[data-testid="create-deck-button"]').click()
      cy.get('[data-testid="create-deck-dialog"]').should('be.visible')

      cy.get('[data-testid="deck-title-input"]').type('Test Deck')
      cy.get('[data-testid="deck-description-input"]').type('This is a test deck')
      cy.get('[data-testid="save-deck-button"]').click()

      cy.contains('Deck created successfully').should('be.visible')
    })
  })

  describe('Study Mode', () => {
    it('should start study session', () => {
      cy.visit('/cards')

      cy.get('[data-testid="deck-item"]').first().click()

      // Verify we're on the deck detail page
      cy.url().should('include', '/cards/decks/')

      // Should show first card
      cy.get('[data-testid="card-front-container"]').should('be.visible')
      cy.get('[data-testid="show-answer-button"]').eq(0).click() // Flip to back
      cy.get('[data-testid="card-back-container"]').should('be.visible')

      // Mark as memorized
      cy.get('[data-testid="toggle-memorized-button"]').first().click().as('toggleMemorized')
      cy.get('@toggleMemorized').contains('Repeat')
      cy.get('@toggleMemorized').click()
      cy.get('@toggleMemorized').contains('Mark as Memorized')
    })
  })
})
