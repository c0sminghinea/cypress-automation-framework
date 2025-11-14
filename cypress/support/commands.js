/**
 * Custom Cypress commands for reusability
 */

/**
 * Hide automation detection to bypass anti-bot protection
 * @example cy.hideAutomation()
 */
Cypress.Commands.add('hideAutomation', () => {
  cy.on('window:before:load', (win) => {
    Object.defineProperty(win.navigator, 'webdriver', { get: () => false })
    Object.defineProperty(win.navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
    Object.defineProperty(win.navigator, 'languages', { get: () => ['en-US', 'en'] })
    win.chrome = { runtime: {} }
    
    const originalQuery = win.navigator.permissions?.query
    if (originalQuery) {
      win.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
          Promise.resolve({ state: 'granted' }) :
          originalQuery(parameters)
      )
    }
  })
})

/**
 * Change viewport with stability check
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @example cy.changeViewport(375, 667)
 */
Cypress.Commands.add('changeViewport', (width, height) => {
  cy.viewport(width, height)
  cy.document().its('readyState').should('eq', 'complete')
  cy.window().its('innerWidth').should('equal', width)
})

/**
 * Verify element dimensions are greater than zero
 * @example cy.get('img').hasDimensions()
 */
Cypress.Commands.add('hasDimensions', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).then($el => {
    const width = $el.width()
    const height = $el.height()
    
    cy.log(`Element dimensions: ${width}px x ${height}px`)
    expect(width).to.be.greaterThan(0, 'Width should be greater than 0')
    expect(height).to.be.greaterThan(0, 'Height should be greater than 0')
  })
  
  return cy.wrap(subject)
})

/**
 * Verify link opens with correct domain
 * @param {string} expectedDomain - Domain to verify
 * @example cy.get('a').verifyLinkDomain('linkedin.com')
 */
Cypress.Commands.add('verifyLinkDomain', { prevSubject: 'element' }, (subject, expectedDomain) => {
  cy.wrap(subject).should('have.attr', 'href').then(href => {
    if (href.startsWith('http')) {
      const url = new URL(href)
      expect(url.hostname).to.include(expectedDomain)
    } else {
      expect(href).to.include(expectedDomain)
    }
  })
  
  return cy.wrap(subject)
})
