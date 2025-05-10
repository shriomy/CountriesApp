describe('Home Page', () => {
    beforeEach(() => {
        // Visit the home page and wait for the API call to complete
        cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries')
        cy.visit('/')
        cy.wait('@getCountries')
    })

    it('should display the header with logo', () => {
        // Check header exists and contains the app name
        cy.get('header').should('exist')
        cy.get('header').contains('World Explorer').should('be.visible')

        // Check the globe icon exists in the header
        cy.get('header svg[data-testid="PublicIcon"]').should('be.visible')
    })

    it('should display the search component', () => {
        // Find search input by label text (more reliable than placeholder)
        cy.contains('label', 'Search for a country').should('be.visible')
        cy.get('input[role="combobox"]').should('be.visible')
    })

    it('should display the filter button', () => {
        cy.contains('button', 'Filters').should('be.visible')
    })

    it('should load and display countries', () => {
        // Wait for countries to load
        cy.get('[data-testid="country-card"]', { timeout: 10000 })
            .should('have.length.greaterThan', 0)
            .first()
            .should('be.visible')
    })
})