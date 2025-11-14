class JBHiFiSearchPage {
  
  selectors = {
    searchPlaceholder: 'input.zk8w1z2',
    searchInput: 'input.input-search',
    searchSubmit: 'button.submit-search',
    productCard: '[data-testid="product-card-content"]',
    productTitle: '[data-testid="product-card-title"]',
    productPrice: '[class*="price"]',
    productRating: '[data-testid="product-card-reviews"]',
    productActions: '[data-testid="product-card-actions"]',
    sortContainer: '.sortby-container select',
    brandFilterButton: 'button.search-results-facet-button',
    minicartToggle: '[data-testid="minicart-toggle"]',
    minicartCloseButton: '[data-testid="attach-slideout-close-button"]',
    notNowButton: 'button:contains("Not now")',
    brandLabel: 'label',
    acceptButton: 'button:contains("Accept")',
    closeButton: 'button[aria-label*="Close"], button:contains("Close"), button:contains("Not now"), [class*="close"]'
  }
  
  closeMiniCart() {
    cy.get('body').then($body => {
      if ($body.find(this.selectors.minicartCloseButton).length > 0) {
        cy.log('Closing mini-cart')
        cy.get(this.selectors.minicartCloseButton).click({ force: true })
        cy.wait(1500)
      }
    })
  }

  extractRating($card) {
    const $ratingEl = $card.find(this.selectors.productRating)
    if ($ratingEl.length === 0) return null
    
    const ratingMatch = $ratingEl.text().match(/(\d+(\.\d+)?)/g)
    return ratingMatch ? parseFloat(ratingMatch[0]) : null
  }

  visit() {
    const baseUrl = Cypress.env('ecommerce_url')
    
    cy.visit(baseUrl, { 
      failOnStatusCode: false,
      onBeforeLoad(win) {
        const mockGeolocation = {
          getCurrentPosition: cy.stub().callsFake((success) => {
            success({ coords: { latitude: -33.8688, longitude: 151.2093 } })
          }),
          watchPosition: cy.stub()
        }
        cy.stub(win.navigator, 'geolocation').value(mockGeolocation)
      }
    })
    
    cy.get(this.selectors.searchPlaceholder, { timeout: 4000 }).should('exist')
  }

  closePopups() {
    cy.get('body').then($body => {
      if ($body.find(this.selectors.closeButton).length > 0) {
        cy.get(this.selectors.closeButton).first().click({ force: true })
        cy.log('Closed location popup')
      }
      if ($body.find(this.selectors.notNowButton).length > 0) {
        cy.get(this.selectors.notNowButton).first().click({ force: true })
        cy.log('Clicked "Not now" on location prompt')
      }
      if ($body.find(this.selectors.acceptButton).length > 0) {
        cy.get(this.selectors.acceptButton).first().click({ force: true })
        cy.log('Accepted cookies')
      }
    })
  }

  searchFor(searchTerm) {
    cy.get(this.selectors.searchPlaceholder, { timeout: 5000 }).click({ force: true })
    cy.wait(500)
    cy.get(this.selectors.searchInput, { timeout: 5000 })
      .should('exist')
      .invoke('val', '')
      .type(searchTerm, { force: true, delay: 100 })
    cy.wait(500)
    cy.get(this.selectors.searchSubmit).click({ force: true })
    cy.get(this.selectors.productCard, { timeout: 8000 }).should('be.visible')
  }

  sortByPrice(option) {
    this.closeMiniCart()
    
    const sortPattern = option === 'high' ? 'price: high - low' : 'price: low - high'
    
    cy.get(this.selectors.sortContainer, { timeout: 10000 }).then($select => {
      let sortValue = null
      
      $select.find('option').each((idx, opt) => {
        if (Cypress.$(opt).text().toLowerCase() === sortPattern) {
          sortValue = Cypress.$(opt).val()
          cy.log(`Sorting by: ${sortPattern}`)
        }
      })
      
      if (sortValue) {
        cy.wrap($select).select(sortValue.toString(), { force: true })
        cy.wait(3000)
        cy.wrap($select).should('have.value', sortValue.toString())
      }
    })
    
    cy.get(this.selectors.productCard, { timeout: 10000 }).first().should('be.visible')
  }

  addProductWithMinRating(minRating, returnInfo = true) {
    let productInfo = {}
    let foundProduct = false
    
    return cy.get(this.selectors.productCard, { timeout: 10000 }).each(($card, index) => {
      if (foundProduct) return
      
      const rating = this.extractRating($card)
      if (rating !== null) {
        cy.log(`Product ${index + 1} rating: ${rating}`)
        if (rating >= minRating) {
          foundProduct = true
          cy.wrap($card).within(() => {
            if (returnInfo) {
              cy.get(this.selectors.productTitle).invoke('text').then(text => {
                productInfo.name = text.trim()
                productInfo.brand = productInfo.name.split(' ')[0]
                cy.log(`Product: ${productInfo.name}`)
                cy.log(`Brand: ${productInfo.brand}`)
              })
              cy.get(this.selectors.productPrice).first().invoke('text').then(text => {
                productInfo.price = parseFloat(text.replace(/[$,\s]/g, ''))
                cy.log(`Price: $${productInfo.price}`)
              })
            } else {
              cy.get(this.selectors.productTitle).invoke('text').then(text => {
                cy.log(`Adding: ${text.trim()}`)
              })
            }
            cy.get(this.selectors.productActions).contains('Add to cart').click({ force: true })
          })
          return false
        }
      } else {
        cy.log(`Product ${index + 1} has no rating - skipping`)
      }
    }).then(() => {
      cy.wait(3000)
      this.closeMiniCart()
      return returnInfo ? cy.wrap(productInfo) : undefined
    })
  }

  filterByBrand(brandName) {
    this.closeMiniCart()
    
    cy.get(this.selectors.brandFilterButton).contains('Brand', { timeout: 10000 }).click({ force: true })
    cy.get('body').then($body => {
      if ($body.find(`label:contains("${brandName}")`).length > 0) {
        cy.log(`Filtering by ${brandName}`)
        cy.get(this.selectors.brandLabel).contains(brandName).click({ force: true })
        cy.wait(2000)
        cy.get(this.selectors.productCard, { timeout: 10000 }).should('be.visible')
      }
    })
    cy.get(this.selectors.brandFilterButton).contains('Brand').click({ force: true })
    cy.wait(1000)
  }

  addFirstAccessoryWithMinRating(minRating) {
    return this.addProductWithMinRating(minRating, false)
  }
}

export default new JBHiFiSearchPage()
