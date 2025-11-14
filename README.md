# Cypress E2E Test Automation Suite

**Author:** Cosmin Ghinea  
**Framework:** Cypress 13.17.0 | Node.js 22.19.0 | Chrome 142

---

## Project Overview

Professional end-to-end test automation suite demonstrating best practices in web testing with comprehensive documentation and clean architecture.

### Key Highlights

- **27 automated tests** across 6 test suites (100% passing)
- **Page Object Model (POM)** design pattern
- **Data-driven testing** with JSON fixtures
- **4 custom Cypress commands** for reusability
- **HTML test reports** with Mochawesome (screenshots & videos)
- **Clean, minimalistic code** with focused comments
- **Fast execution**: ~48 seconds for full suite
- **Cross-browser**: Chrome (default), Firefox, Edge support

### Test Coverage

**Website Tests** - `cypress/e2e/alabs/` **(21 tests)**
- Section title verification with responsive design
- Statistics validation using data-driven approach  
- Social media links verification
- Logo verification with negative assertions
- Navigation, footer, and SEO metadata testing

**JB Hi-Fi E-commerce Tests** - `cypress/e2e/jbhifi/` **(6 tests)**
- Complete shopping flow: Search → Sort → Filter by Brand → Add to Cart
- Multi-step test isolation for easier debugging
- Brand matching validation between TV and accessory
- Real-world e-commerce scenario with dynamic content

---

## Quick Start

### Prerequisites

- **Node.js** 18+ (tested on v22.19.0)
- **npm** 9+
- **Git** (optional, for version control)

### Installation

```bash
# Clone the repository (or download ZIP)
git clone <your-repo-url>
cd Cypress

# Install dependencies
npm install

# Verify installation
npx cypress --version
```

---

## Running Tests

### Run All Tests (Headless Mode)

```bash
npm test
```

Runs all 27 tests in Chrome headless mode (~48 seconds).

### Run Specific Test Suites

```bash
# Website tests only (21 tests, ~30 seconds)
npm run test:alabs

# JB Hi-Fi shopping tests only (6 tests, ~52 seconds)
npm run test:jbhifi
```

### Generate HTML Report

```bash
# Run all tests + generate HTML report
npm run test:report
```

The report will be generated at `cypress/reports/mochawesome/report.html` and will open automatically in your browser.

### Interactive Test Runner (GUI)

```bash
# Open Cypress Test Runner
npx cypress open
```

Select tests to run interactively with live browser view.

### Run in Headed Mode

```bash
# Run with visible browser
npx cypress run --headed --browser chrome

# Run specific suite in headed mode
npx cypress run --headed --spec "cypress/e2e/jbhifi/**/*.cy.js"
```

---

## Test Reports

HTML reports are generated at: `cypress/reports/mochawesome/report.html`

### Report Features:
- Pass/fail status for all 27 tests
- **Screenshots** automatically captured on failures
- **Videos** recorded for all test runs
- Execution time per test and suite
- Visual charts and statistics
- Detailed error messages and stack traces

### View Report

The report opens automatically after `npm run test:report`, or manually open:
```
cypress\reports\mochawesome\report.html
```

---

## Project Structure

```
Cypress/
├── cypress/
│   ├── e2e/
│   │   ├── alabs/                    # Website test suite (5 files, 21 tests)
│   │   │   ├── scenario1-section-title.cy.js
│   │   │   ├── scenario2-statistics-data-driven.cy.js
│   │   │   ├── scenario3-social-media-links.cy.js
│   │   │   ├── scenario4-logo-verification.cy.js
│   │   │   └── scenario5-navigation-custom.cy.js
│   │   └── jbhifi/                   # JB Hi-Fi test suite (1 file, 6 tests)
│   │       └── jbhifi-shopping.cy.js
│   │
│   ├── fixtures/                     # Test data (JSON)
│   │   ├── alabs-test-data.json      # Website test data
│   │   ├── jbhifi-test-data.json     # JB Hi-Fi shopping data
│   │   └── viewports.json            # Responsive viewport configs
│   │
│   ├── pages/                        # Page Object Models (POM)
│   │   ├── HomePage.js               # Website homepage
│   │   ├── JBHiFiSearchPage.js       # JB Hi-Fi search/product page
│   │   └── JBHiFiCartPage.js         # JB Hi-Fi cart page
│   │
│   ├── support/
│   │   ├── commands.js               # 4 custom Cypress commands
│   │   └── e2e.js                    # Global configuration
│   │
│   ├── reports/                      # Generated HTML reports
│   │   └── mochawesome/
│   │       └── report.html           # Main test report
│   │
│   ├── screenshots/                  # Failure screenshots (auto-generated)
│   └── videos/                       # Test execution videos (all runs)
│
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Dependencies and npm scripts
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
├── TEST_DESIGN.md                    # Architecture documentation
└── ASSUMPTIONS.md                    # Project assumptions
```

---

## Test Scenarios

### Website Tests

#### Scenario 1: Section Title Verification
**File:** `scenario1-section-title.cy.js` (2 tests)

- Verifies "Our Activity in Numbers" section title text, font size (>20px), and weight
- Tests responsive visibility on desktop (1280x720) and mobile (375x667)
- Uses custom `changeViewport()` command

#### Scenario 2: Statistics - Data-Driven Testing
**File:** `scenario2-statistics-data-driven.cy.js` (3 tests)

- Iterates through fixture data to test multiple statistics dynamically
- Verifies Years (17+), SaaS Products (11), Airports (50+), Users (200,000+)
- Validates styling and visibility
- **Negative test**: Confirms non-existent statistics don't appear

**Data Source:** `fixtures/alabs-test-data.json`

#### Scenario 3: Social Media Links
**File:** `scenario3-social-media-links.cy.js` (5 tests)

- Verifies all social links exist with correct href
- Validates domain structure (https://)
- Uses custom `verifyLinkDomain()` command
- Checks links are clickable (not disabled)
- **Negative test**: Invalid networks don't exist

#### Scenario 4: Logo Verification
**File:** `scenario4-logo-verification.cy.js` (4 tests)

- Verifies logo is visible with dimensions > 0
- Uses custom `hasDimensions()` command
- **Negative assertions**:
  - Logo is NOT hidden (display, visibility)
  - Image is NOT broken (naturalWidth > 0)
  - Src is NOT empty or invalid

#### Scenario 5: Navigation & Metadata
**File:** `scenario5-navigation-custom.cy.js` (7 tests)

- Navigation menu exists with valid links
- Responsive behavior (mobile/desktop)
- Footer verification
- Page title contains "Airport"
- Meta description exists and not empty
- Page scrolling functionality
- **Negative test**: No broken navigation items

### JB Hi-Fi E-commerce Test

#### Shopping Flow - 6 Step Test
**File:** `jbhifi-shopping.cy.js` (6 tests with `testIsolation: false`)

**Complete E2E Scenario:**

1. **Step 1:** Visit JB Hi-Fi and search for "TV"
2. **Step 2:** Sort by price (high to low), add expensive TV with rating ≥3★
3. **Step 3:** Search for "TV Accessories"
4. **Step 4:** Filter accessories by same brand as TV (brand matching)
5. **Step 5:** Sort by price (low to high), add cheapest accessory
6. **Step 6:** Verify cart has 2 items with matching brands

**Key Features:**
- State preserved across test steps (`testIsolation: false`)
- Brand variable captured from TV and used to filter accessories
- Validates matching brands between TV and accessory
- Optimized wait times for e-commerce reliability

---

## Key Features

### 1. Page Object Model (POM)

Encapsulates page elements and actions for maintainability.

**Example:**
```javascript
import JBHiFiSearchPage from '../../pages/JBHiFiSearchPage'

JBHiFiSearchPage.visit()
JBHiFiSearchPage.searchFor('TV')
JBHiFiSearchPage.sortByPrice('high')
```

### 2. Custom Cypress Commands (4 Active)

**Location:** `cypress/support/commands.js`

#### Anti-Bot Protection
- `hideAutomation()` - Bypasses bot detection for e-commerce testing

#### Responsive Testing
- `changeViewport(width, height)` - Changes viewport with stability verification

#### Element Validation
- `hasDimensions()` - Verifies element has non-zero dimensions
- `verifyLinkDomain(domain)` - Validates link opens to correct domain

### 3. Data-Driven Testing

All test data stored in JSON fixtures (zero hardcoded values).

**Example:**
```javascript
cy.fixture('jbhifi-test-data').then((data) => {
  JBHiFiSearchPage.searchFor(data.jbhifi.searchTerms.primary)
})
```

### 4. Test Isolation Strategy

- **Website tests:** `testIsolation: true` (independent tests)
- **JB Hi-Fi:** `testIsolation: false` (stateful E2E flow)

Allows debugging individual steps in shopping flow while maintaining state.

---

## Configuration Highlights

### Key Settings in `cypress.config.js`

```javascript
{
  // Artifacts
  video: true,                    // Record videos for all tests
  screenshotOnRunFailure: true,   // Auto-screenshot failures
  
  // Timeouts (optimized for e-commerce)
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  
  // Stability
  retries: {
    runMode: 2,                   // 2 retries in CI/headless
    openMode: 0                   // No retries in GUI
  },
  
  // Reporting
  reporter: 'mochawesome',
  reporterOptions: {
    html: true,
    charts: true,
    embeddedScreenshots: true
  }
}
```

---

## npm Scripts

```bash
# Run all tests (headless Chrome)
npm test

# Run specific suites
npm run test:alabs
npm run test:jbhifi

# Generate full HTML report
npm run test:report

# Clean old reports
npm run clean:reports

# Merge JSON reports
npm run report:merge

# Generate HTML from JSON
npm run report:generate
```

---

## Troubleshooting

### Tests Timing Out

Increase timeouts in `cypress.config.js`:
```javascript
defaultCommandTimeout: 15000,
pageLoadTimeout: 90000
```

### Chrome Crashes in Headed Mode

Run in headless mode or reduce `numTestsKeptInMemory` to save memory.

### JB Hi-Fi Tests Failing

E-commerce sites change frequently. Debug steps:
1. Run in headed mode: `npx cypress run --headed`
2. Check if selectors need updating in `JBHiFiSearchPage.js`
3. Verify wait times are sufficient in `commands.js`

### Screenshots Not in Report

Ensure `embeddedScreenshots: true` in `cypress.config.js` reporter options.

---

## Additional Documentation

- **TEST_DESIGN.md** - Architecture and design decisions
- **ASSUMPTIONS.md** - Project assumptions and constraints

---

## Notes

- Tests run in Chrome by default (fastest and most reliable)
- E-commerce tests use conservative wait times for stability
- All test data externalized to fixtures for easy maintenance
- Comprehensive comments throughout codebase
- Production-ready code quality with error handling

---

