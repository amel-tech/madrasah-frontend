describe('Flashcard Management', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('Deck Operations', () => {
    it('should create a new deck', () => {
      cy.visit('/decks')

      cy.createDeck('Test Deck', 'This is a test deck')

      // Should show success message and new deck
      cy.contains('Deck created successfully').should('be.visible')
      cy.contains('Test Deck').should('be.visible')
    })

    it('should edit an existing deck', () => {
      cy.visit('/decks')

      // Click edit on first deck
      cy.get('[data-testid="deck-item"]').first().within(() => {
        cy.get('[data-testid="edit-deck-button"]').click()
      })

      // Update deck details
      cy.get('[data-testid="deck-title-input"]').clear().type('Updated Deck Title')
      cy.get('[data-testid="save-deck-button"]').click()

      // Should show updated title
      cy.contains('Updated Deck Title').should('be.visible')
    })

    it('should delete a deck', () => {
      cy.visit('/decks')

      // Click delete on first deck
      cy.get('[data-testid="deck-item"]').first().within(() => {
        cy.get('[data-testid="delete-deck-button"]').click()
      })

      // Confirm deletion
      cy.get('[data-testid="confirm-delete-button"]').click()

      // Should show success message
      cy.contains('Deck deleted successfully').should('be.visible')
    })
  })

  describe('Card Operations', () => {
    it('should create a new card', () => {
      cy.visit('/decks')

      // Click on first deck to view cards
      cy.get('[data-testid="deck-item"]').first().click()

      cy.createCard(1, 'What is Islam?', 'Islam is a monotheistic religion')

      // Should show success message and new card
      cy.contains('Card created successfully').should('be.visible')
      cy.contains('What is Islam?').should('be.visible')
    })

    it('should edit an existing card', () => {
      cy.visit('/decks/1')

      // Click edit on first card
      cy.get('[data-testid="card-item"]').first().within(() => {
        cy.get('[data-testid="edit-card-button"]').click()
      })

      // Update card content
      cy.get('[data-testid="card-front-input"]').clear().type('Updated Question')
      cy.get('[data-testid="card-back-input"]').clear().type('Updated Answer')
      cy.get('[data-testid="save-card-button"]').click()

      // Should show updated content
      cy.contains('Updated Question').should('be.visible')
    })

    it('should delete a card', () => {
      cy.visit('/decks/1')

      // Click delete on first card
      cy.get('[data-testid="card-item"]').first().within(() => {
        cy.get('[data-testid="delete-card-button"]').click()
      })

      // Confirm deletion
      cy.get('[data-testid="confirm-delete-button"]').click()

      // Should show success message
      cy.contains('Card deleted successfully').should('be.visible')
    })
  })

  describe('Study Mode', () => {
    it('should start study session', () => {
      cy.visit('/decks/1')

      // Start study mode
      cy.get('[data-testid="start-study-button"]').click()

      // Should show first card
      cy.get('[data-testid="card-front"]').should('be.visible')
      cy.get('[data-testid="show-answer-button"]').click()
      cy.get('[data-testid="card-back"]').should('be.visible')
    })

    it('should navigate through cards in study mode', () => {
      cy.visit('/decks/1/study')

      // Show answer and go to next card
      cy.get('[data-testid="show-answer-button"]').click()
      cy.get('[data-testid="next-card-button"]').click()

      // Should show next card
      cy.get('[data-testid="card-counter"]').should('contain', '2')
    })
  })
})
