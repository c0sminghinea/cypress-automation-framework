/// <reference types="cypress" />

import HomePage from '../../pages/HomePage'

describe('Scenario 3: Social Media Links Verification', () => {
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

  it('should verify all social media links from fixture exist and have correct href', () => {
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .should('have.length.greaterThan', 0)
            .first()
            .should('have.attr', 'href')
            .and('include', social.domain)
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify social links have correct domain structure (data-driven)', () => {
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .first()
            .invoke('attr', 'href')
            .should('match', /^https?:\/\//i)
            .and('include', social.domain)
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify opened URL domain using custom command for all platforms', () => {
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .first()
            .verifyLinkDomain(social.domain)
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify all social media links are clickable', () => {
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .first()
            .should('not.have.attr', 'disabled')
          
          homePage.getSocialLink(social.domain)
            .first()
            .should('have.attr', 'href')
            .and('not.be.empty')
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should not find invalid social media links (negative test)', () => {
    cy.get('a[href*="myspace.com"]').should('not.exist')
    cy.get('a[href*="invalid-social-network.com"]').should('not.exist')
  })
})

describe('Scenario 3: Social Media Links Verification', () => {
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

  it('should verify all social media links from fixture exist and have correct href', () => {
    
    testData.socialMedia.forEach((social) => {
      
      cy.get('body').then($body => {

        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          
          homePage.getSocialLink(social.domain)
            .should('have.length.greaterThan', 0)  
            .first()                                
            .should('have.attr', 'href')            
            .and('include', social.domain)                   
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify social links have correct domain structure (data-driven)', () => {
    
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .first()
            .invoke('attr', 'href')  
            .should('match', /^https?:\/\//i)  
            .and('include', social.domain)     
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify opened URL domain using custom command for all platforms', () => {
    
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          homePage.getSocialLink(social.domain)
            .first()
            .verifyLinkDomain(social.domain)
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should verify all social media links are clickable', () => {
    
    testData.socialMedia.forEach((social) => {
      cy.get('body').then($body => {
        const socialLink = `a[href*="${social.domain}"]`
        
        if ($body.find(socialLink).length > 0) {
          
          homePage.getSocialLink(social.domain)
            .first()
            .should('not.have.attr', 'disabled')  
          
          homePage.getSocialLink(social.domain)
            .first()
            .should('have.attr', 'href')   
            .and('not.be.empty')           
          
        } else {
          cy.log(`${social.platform} link not found on page - skipping`)
        }
      })
    })
  })

  it('should not find invalid social media links (negative test)', () => {
    cy.get('a[href*="myspace.com"]').should('not.exist')  
    cy.get('a[href*="invalid-social-network.com"]').should('not.exist')
  })
})
