class JBHiFiCartPage {
  
  selectors = {
    cartProductTitle: '[data-testid="cart-product-title"]'
  }
  
  visit() {
    const baseUrl = Cypress.env('ecommerce_url')
    cy.visit(`${baseUrl}/cart`, { failOnStatusCode: false })
    cy.get(this.selectors.cartProductTitle, { timeout: 10000 })
      .should('have.length.at.least', 1)
  }

  extractBrand(productName) {
    return productName.trim().split(' ')[0]
  }

  verifyItemCount(expectedCount) {
    cy.log(`Verifying cart has ${expectedCount} items`)
    cy.get(this.selectors.cartProductTitle, { timeout: 10000 })
      .should('have.length', expectedCount)
  }

  verifyBrandsMatch() {
    cy.get(this.selectors.cartProductTitle).then($items => {
      const brands = []
      $items.each((idx, el) => {
        const itemName = Cypress.$(el).text().trim()
        brands.push(this.extractBrand(itemName))
      })
      
      if (brands.length === 2) {
        expect(brands[0]).to.equal(brands[1], 'Both items should be the same brand')
        cy.log(`Both items are ${brands[0]} brand`)
      }
    })
  }
}

export default new JBHiFiCartPage()
