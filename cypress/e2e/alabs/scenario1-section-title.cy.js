/// <reference types="cypress" />

import HomePage from '../../pages/HomePage'

describe('Scenario 1: Section Title Verification', () => {
  const homePage = new HomePage()
  const sectionTitle = 'activity in numbers'

  beforeEach(() => {
    homePage.visit()
  })

  it('should verify section title text, font size, and weight', () => {
    homePage.getSectionTitle(sectionTitle)
      .scrollIntoView({ duration: 300 })
      .should('be.visible')
      .invoke('text')
      .should('match', /activity in numbers/i)

    homePage.getSectionTitle(sectionTitle).then($title => {
      const styles = window.getComputedStyle($title[0])
      const fontSize = parseFloat(styles.fontSize)
      const fontWeight = parseInt(styles.fontWeight)

      expect(fontSize).to.be.greaterThan(20)
      expect(fontWeight).to.be.at.least(100)
    })
  })

  it('should verify section title visibility on desktop and mobile viewports', () => {
    cy.fixture('viewports').then(viewportData => {
      const { desktop, mobile } = viewportData.viewports
      
      cy.changeViewport(desktop.width, desktop.height)
      homePage.getSectionTitle(sectionTitle)
        .scrollIntoView({ duration: 300 })
        .should('be.visible')
      
      cy.changeViewport(mobile.width, mobile.height)
      homePage.getSectionTitle(sectionTitle)
        .scrollIntoView({ duration: 300 })
        .should('be.visible')
    })
  })
})
