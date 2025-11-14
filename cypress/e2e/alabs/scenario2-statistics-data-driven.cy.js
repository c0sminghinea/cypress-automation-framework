/// <reference types="cypress" />

import HomePage from '../../pages/HomePage'

describe('Scenario 2: Our Activity in Numbers - Data-Driven Test', () => {
  const homePage = new HomePage()
  let testData

  before(() => {
    cy.fixture('alabs-test-data').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    homePage.visit()
  })

  it('should verify statistics section and all statistics from fixture (data-driven)', () => {
    homePage.getSectionTitle('activity in numbers')
      .scrollIntoView({ duration: 300 })
      .should('be.visible')
    
    testData.statistics.forEach((stat) => {
      cy.log(`Verifying statistic: ${stat.label}`)
      cy.contains(stat.label, { matchCase: false })
        .scrollIntoView()
        .should('be.visible')
      cy.contains(stat.value).should('be.visible')
    })
  })

  it('should verify statistic styling and visibility', () => {
    homePage.getSectionTitle('activity in numbers')
      .scrollIntoView({ duration: 300 })
      .should('be.visible')
    
    cy.get('[class*="number"], [class*="stat"], [class*="count"]')
      .first()
      .should('exist')
      .and('be.visible')
      .and('not.have.css', 'display', 'none')
      .and('not.have.css', 'visibility', 'hidden')
  })

  it('should not find non-existent statistics (negative test)', () => {
    cy.contains('Unicorns', { matchCase: false }).should('not.exist')
    cy.contains('Invalid Statistic 12345').should('not.exist')
  })
})
