const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    testIsolation: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 60000,
    execTimeout: 60000,
    taskTimeout: 60000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    waitForAnimations: true,
    animationDistanceThreshold: 5,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/examples/**', '**/__snapshots__/**'],
    supportFile: 'cypress/support/e2e.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      timestamp: 'longDate'
    },
    
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-dev-shm-usage')
          launchOptions.args.push('--no-sandbox')
        }
        return launchOptions
      })
      
      return config
    },
  },
  
  env: {}
})
