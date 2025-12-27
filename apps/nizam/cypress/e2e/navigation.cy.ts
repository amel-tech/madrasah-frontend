describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should navigate to main sections', () => {
    cy.visit('/')

    // Test navigation to different sections
    cy.get('[data-testid="nav-dashboard"]').click()
    cy.url().should('include', '/dashboard')

    cy.get('[data-testid="nav-students"]').click()
    cy.url().should('include', '/students')

    cy.get('[data-testid="nav-classes"]').click()
    cy.url().should('include', '/classes')

    cy.get('[data-testid="nav-reports"]').click()
    cy.url().should('include', '/reports')
  })

  it('should show correct page titles', () => {
    cy.visit('/dashboard')
    cy.contains('Dashboard').should('be.visible')

    cy.visit('/students')
    cy.contains('Students').should('be.visible')

    cy.visit('/classes')
    cy.contains('Classes').should('be.visible')
  })

  it('should handle breadcrumbs correctly', () => {
    cy.visit('/students/123')

    // Should show breadcrumb navigation
    cy.get('[data-testid="breadcrumb"]').should('contain', 'Students')
    cy.get('[data-testid="breadcrumb"]').should('contain', 'Student Details')
  })
})
