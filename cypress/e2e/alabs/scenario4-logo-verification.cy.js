/// <reference types="cypress" />

import HomePage from '../../pages/HomePage'

describe('Scenario 4: Logo Verification with Negative Assertions', () => {
  const homePage = new HomePage()
  const logoSelector = 'header img, img[alt*="logo" i], .logo img'

  beforeEach(() => {
    homePage.visit()
  })

  it('should verify logo is visible with dimensions greater than 0', () => {
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .should('be.visible')
      .then($logo => {
        const width = $logo.width()
        const height = $logo.height()
        
        expect(width).to.be.greaterThan(0)
        expect(height).to.be.greaterThan(0)
      })
  })

  it('should verify logo using custom command for dimensions', () => {
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .hasDimensions()
  })

  it('should verify logo is NOT hidden and NOT broken (negative assertions)', () => {
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .should('not.have.css', 'display', 'none')
      .and('not.have.css', 'visibility', 'hidden')
      .should('have.attr', 'src')
      .and('not.be.empty')
    
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('should verify logo does NOT have invalid src (negative assertion)', () => {
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .should('have.attr', 'src')
      .then(src => {
        expect(src).to.not.be.empty
        expect(src).to.not.equal('#')
        expect(src).to.not.include('undefined')
      })
  })
})

describe('Scenario 4: Logo Verification with Negative Assertions', () => {
  const homePage = new HomePage()
  const logoSelector = 'header img, img[alt*="logo" i], .logo img'

  beforeEach(() => {
    homePage.visit()
  })

  it('should verify logo is visible with dimensions greater than 0', () => {
    
    cy.get(logoSelector)
      .filter(':visible')  
      .first()             
      .should('be.visible')  
      .then($logo => {
        const width = $logo.width()
        const height = $logo.height()
        expect(width).to.be.greaterThan(0)
        expect(height).to.be.greaterThan(0)
      })
  })

  it('should verify logo using custom command for dimensions', () => {
    
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .hasDimensions()
  })

  it('should verify logo is NOT hidden and NOT broken (negative assertions)', () => {
    
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .should('not.have.css', 'display', 'none')
      .and('not.have.css', 'visibility', 'hidden')
      .should('have.attr', 'src')
      .and('not.be.empty')
    
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('should verify logo does NOT have invalid src (negative assertion)', () => {
    
    cy.get(logoSelector)
      .filter(':visible')
      .first()
      .should('have.attr', 'src')  
      .then(src => {
        expect(src).to.not.be.empty      
        expect(src).to.not.equal('#')
        expect(src).to.not.include('undefined')
        
      })
  })
})
