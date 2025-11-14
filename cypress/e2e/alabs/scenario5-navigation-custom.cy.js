/// <reference types="cypress" />

import HomePage from '../../pages/HomePage'

describe('Scenario 5: Navigation, Footer, and Page Metadata', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    homePage.visit()
  })

  describe('Navigation Menu', () => {
    it('should verify navigation menu exists with valid links', () => {
      homePage.verifyNavigationExists()
      homePage.getNavigationLinks()
        .filter(':visible')
        .should('have.length.greaterThan', 0)
        .first()
        .should('have.attr', 'href')
        .and('not.be.empty')
    })

    it('should verify navigation is responsive on mobile and desktop', () => {
      cy.viewport(375, 667)
      homePage.verifyNavigationExists()
      
      cy.viewport(1280, 720)
      homePage.getNavigationLinks().should('have.length.greaterThan', 0)
    })

    it('should not have broken navigation items (negative test)', () => {
      cy.get('a:contains("undefined")').should('not.exist')
      cy.get('a:contains("null")').should('not.exist')
    })
  })

  describe('Footer and Page Metadata', () => {
    it('should verify footer exists', () => {
      cy.get('footer, [class*="footer"]').should('exist')
    })

    it('should verify page title contains Airport', () => {
      cy.title()
        .should('not.be.empty')
        .and('include', 'Airport')
    })

    it('should verify meta description exists and is not empty', () => {
      cy.get('head meta[name="description"]')
        .should('exist')
        .and('have.attr', 'content')
        .and('not.be.empty')
    })
  })

  describe('Page Scrolling', () => {
    it('should verify page scrolls correctly', () => {
      cy.window().its('scrollY').should('equal', 0)
      cy.scrollTo('bottom', { duration: 1000 })
      cy.window().its('scrollY').should('be.greaterThan', 0)
    })
  })
})

describe('Scenario 5: Navigation, Footer, and Page Metadata', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    homePage.visit()
  })

  describe('Navigation Menu', () => {
    
    it('should verify navigation menu exists with valid links', () => {
      
      homePage.verifyNavigationExists()
      
      homePage.getNavigationLinks()
        .filter(':visible')  
        .should('have.length.greaterThan', 0)  
        .first()  
        .should('have.attr', 'href')  
        .and('not.be.empty')  
    })

    it('should verify navigation is responsive on mobile and desktop', () => {
      // TEST ON MOBILE
      cy.viewport(375, 667)
      homePage.verifyNavigationExists() 
      // TEST ON DESKTOP
      cy.viewport(1280, 720)
      homePage.getNavigationLinks().should('have.length.greaterThan', 0)
    })

    it('should not have broken navigation items (negative test)', () => {

      cy.get('a:contains("undefined")').should('not.exist')
      
      cy.get('a:contains("null")').should('not.exist')
      
    })
  })

  describe('Footer and Page Metadata', () => {
    
    it('should verify footer exists', () => {
      cy.get('footer, [class*="footer"]').should('exist')
    })

    it('should verify page title contains Airport', () => {
      
      cy.title()
        .should('not.be.empty') 
        .and('include', 'Airport')
    })

    it('should verify meta description exists and is not empty', () => {

      cy.get('head meta[name="description"]')
        .should('exist')
        .and('have.attr', 'content')
        .and('not.be.empty')
    })
  })

  describe('Page Scrolling', () => {
    
    it('should verify page scrolls correctly', () => {
      cy.window().its('scrollY').should('equal', 0)
      cy.scrollTo('bottom', { duration: 1000 })
      cy.window().its('scrollY').should('be.greaterThan', 0)
    })
  })
})
