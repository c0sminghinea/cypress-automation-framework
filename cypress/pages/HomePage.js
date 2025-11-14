class HomePage {
  
  selectors = {
    logo: 'img[alt*="logo" i], header img, .logo img, a.logo img',
    navMenu: 'nav, [class*="menu"], [class*="navigation"]',
    navLinks: 'nav a, header a[href]',
    sectionTitle: 'h2, h3, .section-title, [class*="title"]',
    socialLink: 'a[href*="{platform}"]'
  }

  visit() {
    const url = Cypress.env('alabs_url') || 'https://airportlabs.com/'
    cy.visit(url)
    cy.document().its('readyState').should('eq', 'complete')
  }

  getSectionTitle(titleText) {
    return cy.contains(this.selectors.sectionTitle, titleText, { matchCase: false })
  }

  getSocialLink(platform) {
    return cy.get(`a[href*="${platform.toLowerCase()}"]`)
  }

  getLogo() {
    return cy.get(this.selectors.logo).first()
  }

  verifyNavigationExists() {
    cy.get(this.selectors.navMenu).should('exist')
  }

  getNavigationLinks() {
    return cy.get(this.selectors.navLinks)
  }
}

export default HomePage
