const percyScreenshot = require('@percy/appium-app');

describe('Search Wikipedia Functionality', () => {
  it('can find search results', async () => {
    var searchSelector = await $(`~Search Wikipedia`);
    await browser.pause(5000);

    await percyScreenshot('Home Screen');

    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    // Change `BrowserStack` to other word to see the diff in next build
    await insertTextSelector.addValue("Browsertack");
    await browser.hideKeyboard();
    await browser.pause(5000);

    // take second screenshot
    await percyScreenshot('Search results');
  });
});