const percyScreenshot = require('@percy/appium-app');
const wd = require('wd');
var asserters = wd.asserters;

// Note: While this example shows how to use percyScreenshot with Browserstack App
// Automate, percyScreenshot method just expects a initialized driver object and does
// not care if its connected to App Automate or any other appium server. 
// You are free to create `driver` object anyway you want and can pass it
// to the percyScreenshot function.

const desiredCaps = {
  // Set BStack options that would allow App Automate to run
  'bstack:options': {
    userName: process.env.AA_USERNAME,
    accessKey: process.env.AA_ACCESS_KEY
  },

  // Percy Options (defaults)
  'percyOptions': {
    enabled: true,
    ignoreErrors: true
  },

  // Set URL of the application under test
  app: process.env.APP,

  // Specify device and os_version for testing
  device: 'Google Pixel 6',
  os_version: '12',

  // Set other BrowserStack capabilities
  project: 'First Node App Percy Project',
  build: 'App Percy wd Android',
  name: 'first_visual_test'
};

// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
const driver = wd.promiseRemote('https://hub-cloud.browserstack.com/wd/hub');

// Test case for the BrowserStack sample Android app.
// If you have uploaded your app, update the test case here.
driver.init(desiredCaps)
  .then(function() {
    // wait for app to load
    return new Promise((resolve) => setTimeout(resolve, 5000))
  })
  .then(function() {
    return percyScreenshot(driver, 'Home Screen');
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById('org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    // Change `BrowserStack` to other word to see the diff in next build
    return searchInput.sendKeys("App Percy 20");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');   
  })
  .then(function () {
    return driver.hideKeyboard();   
  })
  .then(function() {
    return percyScreenshot(driver, 'Search results');
  })
  .fin(function() {
    // Invoke driver.quit() after the test is done to indicate that the test is completed.
    return driver.quit();
  })
  .done();
