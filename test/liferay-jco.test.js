'use strict';

const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Eyes, Target } = require('@applitools/eyes-selenium');
const {
  RectangleSize
} = require('@applitools/eyes-sdk-core');


describe('Demo App - Basic', function () {
  let eyes, driver;

  beforeEach(async () => {
    // Create Eyes object

    eyes = new Eyes();

    // Optional: Set batch name for tests

    eyes.setBatch({ name: 'Demo Test - liferay.com' });

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
    // ⭐️ Note to see visual bugs, 1st run will automatically be set as the baseline.
    // subsequent runs will compare against baseline run until diff is accepted on applitools.com

    await driver.get('http://localhost:8080');

    // Label App name, testcase name and browser screensize
    await eyes.open(driver, 'Liferay Portal App Name', 'new testcase name', new RectangleSize(800, 600))

    // Take a screenshot of the full page, label the screenshot "Landing Page"
    await eyes.check('Clay Alert Component', Target.window().fully());

    // Terminates the test
    await eyes.close();

  });

  afterEach(async () => {
    // Close the browser

    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.

    await eyes.abort();
  });
});
