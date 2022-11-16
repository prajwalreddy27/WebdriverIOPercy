
const percyScreenshot = require('@percy/appium-app');

describe('Text Verification', () => {
  it('should match displayed text with input text', async () => {
    await browser.pause(2000);    
    await percyScreenshot('Home Screen');

    var textButton = await $(`~Text Button`);

    await textButton.waitForDisplayed({ timeout: 30000 });
    await textButton.click();

    var textInput = await $(`~Text Input`);
    await textInput.waitForDisplayed({ timeout: 30000 });
    await textInput.click()
    // Update hello@browserstack.com email to something else to see diff in next build 
    await textInput.addValue("hello@browserstack.com"+"\n");
    await browser.hideKeyboard();

    var textOutput = await $(`~Text Output`);
    await textOutput.waitForDisplayed({ timeout: 30000 });
    
    await percyScreenshot('Form page');
  });
});
