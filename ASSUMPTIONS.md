# Assumptions Document

## Project Overview
This document outlines all assumptions made during the development of this Cypress test automation framework.

---

## General Assumptions

### 1. **Environment & Setup**
- **Assumption**: Testers have Node.js (v14+) and npm installed on their machines
- **Reasoning**: Cypress requires Node.js and npm as prerequisites
- **Impact**: Installation instructions assume these are available

### 2. **Internet Connectivity**
- **Assumption**: Stable internet connection is available during test execution
- **Reasoning**: Tests access external websites
- **Impact**: Tests may fail or timeout with poor connectivity

### 3. **Website Availability**
- **Assumption**: Target websites are accessible and operational
- **Reasoning**: Cannot control third-party website uptime
- **Impact**: Tests fail if websites are down or undergoing maintenance

---

## Part 1: Website Tests - Assumptions

### Scenario 1: Section Title Verification
- **Assumption**: The "Our Activity in Numbers" section title remains consistent
- **Selector Strategy**: Uses flexible text matching (`contains()`) rather than strict selectors
- **Viewport Assumptions**:
  - Mobile: 375x667 (iPhone SE)
  - Desktop: 1280x720 (common laptop resolution)
- **Font Properties**: Assumed minimum font size of 20px and font weight >= 400 for visibility

### Scenario 2: Statistics Data-Driven Tests
- **Assumption**: Statistics section exists and contains numeric data
- **Dynamic Content**: Statistics values may change over time (tests verify structure, not exact numbers)
- **Fixture Data**: Test data in `testData.json` represents minimum expected values
- **Selector Flexibility**: Uses generic selectors as specific IDs/classes may not exist

### Scenario 3: Social Media Links
- **Assumption**: Social media links are present in footer or header
- **Platforms Expected**: LinkedIn, Twitter/X, Facebook
- **Link Behavior**: Assumes links open in new tab (`target="_blank"`)
- **Domain Verification**: Links may redirect (e.g., linkedin.com → www.linkedin.com)

### Scenario 4: Logo Verification
- **Assumption**: Website has a visible logo (typically in header)
- **Image Properties**: Logo is an `<img>` element with alt text containing "logo"
- **Dimensions**: Logo should have positive width and height (not hidden)
- **Negative Testing**: Validates logo is NOT hidden, broken, or zero-sized

### Scenario 5: Navigation and Page Elements (Custom Scenario)
- **Assumption**: Website has standard navigation structure (header with links)
- **Footer Assumption**: Page contains a footer section with useful information
- **Meta Tags**: Page includes proper HTML meta tags (title, description)
- **Responsive Design**: Navigation adapts between mobile and desktop viewports

---

## Part 2: Shopping Site (JB Hi-Fi) - Assumptions

### General Shopping Assumptions
- **Website Choice**: JB Hi-Fi (www.jbhifi.com.au) was chosen as it's a stable, well-known Australian e-commerce platform
- **Test Environment**: Tests run against production website (not test environment)
- **Product Availability**: Products may be discontinued, out of stock, or prices may change
- **Dynamic Content**: Real e-commerce sites have dynamic pricing, inventory, and layout
- **Regional Differences**: JB Hi-Fi is Australia-based; prices in AUD

### TV Selection Assumptions
- **Category Access**: TV category is accessible via search
- **Filtering**: Brand filtering is available (multiple brands like Samsung, LG, Sony, TCL)
- **Ratings System**: Products have a rating system (stars out of 5)
- **Price Display**: Prices are displayed in AUD format
- **Product Attributes**: Each product has name, price, rating, brand

### Accessory Selection Assumptions
- **Accessory Category**: TV accessories category exists and is accessible
- **Same Brand Available**: Accessories from the same brand as the selected TV are available
- **Brand Matching**: Test dynamically filters accessories by the TV's brand (e.g., if Samsung TV selected, filters Samsung accessories)
- **Rating Consistency**: Accessories use same rating system as TVs
- **Price Range**: Accessories are generally cheaper than TVs

### Cart Functionality Assumptions
- **Cart Persistence**: Cart persists across page navigation
- **Price Accuracy**: Displayed prices match cart prices
- **Total Calculation**: Cart accurately sums product prices
- **Brand Verification**: Brand information is visible in cart

---

## Technical Assumptions

### 1. **Page Object Model (POM)**
- **Assumption**: POMs provide better maintainability than inline selectors
- **Approach**: Each page has a dedicated POM class
- **Selector Strategy**: Flexible selectors using text, classes, and attributes

### 2. **Custom Commands**
- **Assumption**: Reusable commands improve test readability
- **Implementation**: 4 custom commands created for common operations
- **Chaining**: Commands support Cypress chaining pattern

### 3. **Fixtures (Data-Driven Testing)**
- **Assumption**: Separating test data from test logic improves maintainability
- **Format**: JSON format for easy editing
- **Usage**: Tests load fixture data dynamically

### 4. **Negative Testing**
- **Assumption**: Negative assertions strengthen test coverage
- **Approach**: Verify elements do NOT have invalid states
- **Examples**: Logo is NOT hidden, invalid links do NOT exist

### 5. **Waiting Strategy**
- **Assumption**: Combine explicit waits with static waits where needed
- **Implementation**: Uses both intelligent waiting and strategic static waits
- **Methods Used**:
  - `.should('be.visible')`
  - Document ready state checks
  - Custom commands with stability checks
  - Strategic `cy.wait()` for animations and transitions

### 6. **Browser Support**
- **Assumption**: Tests run in Chrome (specified in npm scripts)
- **Compatibility**: Tests also compatible with Firefox, Edge
- **Note**: Browser-specific issues handled with Cypress best practices

### 7. **Viewport Testing**
- **Assumption**: Mobile and desktop viewports represent majority of users
- **Mobile**: 375x667 (iPhone SE)
- **Desktop**: 1280x720 (standard laptop)
- **Approach**: Fixtures store viewport configurations for flexibility

---

## Configuration Assumptions

### `cypress.config.js`
- **Base URL**: Not set (tests use environment variables for flexibility)
- **Timeouts**:
  - Default command timeout: 10 seconds
  - Page load timeout: 60 seconds
- **Retries**: Run mode retries set to 2 for flaky test resilience
- **Videos**: Enabled and recorded for all tests
- **Screenshots**: Enabled on failure for debugging

### Environment Variables
- **airportlabs_url**: AirportLabs website URL
- **ecommerce_url**: JB Hi-Fi e-commerce base URL

---

## Documentation Assumptions

### README.md
- **Audience**: Developers, QAs, and reviewers unfamiliar with the project
- **Content**: Installation, execution, structure, and feature explanations
- **Format**: Clear, structured Markdown with examples

### TEST_DESIGN.md
- **Purpose**: Explain architectural decisions and trade-offs
- **Content**: Structure rationale, improvement suggestions, maintainability analysis
- **Audience**: Technical reviewers and senior engineers

### Additional Documentation
- **ASSUMPTIONS.md**: (This file) Documents all assumptions and constraints
- **README.md**: Setup, execution, and project overview

---

## Testing Philosophy Assumptions

### 1. **Test Independence**
- **Assumption**: Each test should be independently executable
- **Implementation**: Test isolation enabled in config
- **Benefits**: Tests can run in any order

### 2. **Test Readability**
- **Assumption**: Tests should read like requirements
- **Approach**: Descriptive test names and extensive logging
- **Example**: "should verify section title is visible on mobile viewport"

### 3. **Maintainability First**
- **Assumption**: Code quality > test coverage
- **Priority**: Write maintainable tests even if slower to develop
- **Long-term Value**: Easier to update and extend

### 4. **Fail Fast**
- **Assumption**: Tests should fail quickly and clearly
- **Implementation**: Explicit assertions with meaningful messages
- **Debugging**: Screenshots and logs on failure

### 5. **Real-World Scenarios**
- **Assumption**: Tests should mimic actual user behavior
- **Approach**: Multi-step scenarios (e.g., shopping cart flow)
- **User-Centric**: Focus on user journeys, not just element presence

---

## Limitations & Known Issues

### 1. **Third-Party Website Changes**
- **Issue**: Test websites may update their content and structure
- **Impact**: Tests may break due to layout or selector changes
- **Mitigation**: Flexible selectors and regular maintenance

### 2. **Dynamic E-Commerce Content**
- **Issue**: JB Hi-Fi product catalog changes frequently
- **Impact**: Real product testing is unreliable
- **Solution**: Tests use flexible logic to handle dynamic inventory

### 3. **No API Access**
- **Issue**: Cannot verify backend data or cart state via API
- **Impact**: Limited to UI validation only
- **Recommendation**: Request API access for production testing

### 4. **Performance Variability**
- **Issue**: Test execution speed varies by network and system
- **Impact**: Occasional timeout or timing issues
- **Mitigation**: Intelligent waits and retry logic

### 5. **Cross-Browser Consistency**
- **Issue**: Different browsers may render elements differently
- **Impact**: Tests may behave differently in Chrome vs Firefox
- **Mitigation**: Test in multiple browsers when critical

---

## Future Assumptions (If Extended)

### With More Time, Assume:
1. **CI/CD Pipeline**: Tests run automatically on commits (GitHub Actions)
2. **Test Reports**: HTML reports with screenshots (Mochawesome)
3. **API Testing**: Hybrid UI + API test strategy
4. **Visual Regression**: Automated visual comparisons (Percy/Applitools)
5. **Performance Metrics**: Page load time assertions
6. **Accessibility Testing**: WCAG compliance checks (axe-core)
7. **Test Data Management**: Database seeding for predictable states
8. **Parallel Execution**: Tests run in parallel for faster feedback

---

## Conclusion

These assumptions were made to:
1. **Balance Realism with Practicality**: Test real websites while acknowledging limitations
2. **Demonstrate Best Practices**: Show industry-standard patterns (POM, fixtures, custom commands)
3. **Ensure Maintainability**: Write code that's easy to update and extend
4. **Provide Clear Documentation**: Help reviewers understand decisions and trade-offs
5. **Showcase Technical Skills**: Demonstrate understanding of test automation principles

---

