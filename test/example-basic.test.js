'use strict';

const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Eyes, Target } = require('@applitools/eyes-selenium');

describe('Demo App - Basic', function () {
  let eyes, driver;

  beforeEach(async () => {
    // Create Eyes object
    
    eyes = new Eyes();

    // Optional: Set batch name for tests

    eyes.setBatch({ name: 'Demo Batch - Selenium for JavaScript - Basic' });

    // Use Chrome browser
    const options = new chrome.Options();

    if (process.env.CI === 'true') options.headless();

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  it('Smoke Test', async () => {
    // Navigate to the url we want to test
    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)

    await driver.get('https://demo.applitools.com');

    // Call Open on eyes to initialize a test session
    
    await eyes.open(driver, 'Demo App - Selenium for JavaScript - Basic', 'Smoke Test - Selenium for JavaScript - Basic');

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html

    await eyes.check('Login Window', Target.window().fully());

    // Click the 'Log in' button.

    await driver.findElement(By.id('log-in')).click();

    // Check the app page

    await eyes.check('App Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    
    const results = await eyes.close();

    console.log('Basic Results', results);
  });

  afterEach(async () => {
    // Close the browser

    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    
    await eyes.abort();
  });
});
