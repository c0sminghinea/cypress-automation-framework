/// <reference types="cypress" />

import JBHiFiSearchPage from '../../pages/JBHiFiSearchPage'
import JBHiFiCartPage from '../../pages/JBHiFiCartPage'

describe('JB Hi-Fi Shopping Flow', { testIsolation: false }, () => {
  let tvBrand
  let testData

  before(() => {
    cy.hideAutomation()
    cy.on('uncaught:exception', () => false)
    cy.fixture('jbhifi-test-data').then((data) => {
      testData = data.jbhifi
    })
  })

  it('should visit JB Hi-Fi and search for TVs', () => {
    JBHiFiSearchPage.visit()
    JBHiFiSearchPage.closePopups()
    JBHiFiSearchPage.searchFor(testData.searchTerms.primary)
  })

  it('should sort by price (high to low) and add TV to cart', () => {
    JBHiFiSearchPage.sortByPrice('high')
    JBHiFiSearchPage.addProductWithMinRating(testData.minRating).then((productInfo) => {
      tvBrand = productInfo.brand
      cy.log(`✓ TV Brand captured: ${tvBrand}`)
    })
  })

  it('should search for TV accessories', () => {
    JBHiFiSearchPage.searchFor(testData.searchTerms.accessory)
  })

  it('should filter accessories by same brand as TV', () => {
    cy.then(() => {
      JBHiFiSearchPage.filterByBrand(tvBrand)
      cy.log(`✓ Filtered by brand: ${tvBrand}`)
    })
  })

  it('should sort accessories by price (low to high) and add to cart', () => {
    JBHiFiSearchPage.sortByPrice('low')
    JBHiFiSearchPage.addFirstAccessoryWithMinRating(testData.minRating)
  })

  it('should verify cart has 2 items with matching brands', () => {
    JBHiFiCartPage.visit()
    JBHiFiCartPage.verifyItemCount(testData.expectedCartItems)
    JBHiFiCartPage.verifyBrandsMatch()
  })
})
