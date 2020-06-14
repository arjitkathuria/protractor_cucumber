var chai = require('chai');
var expect = chai.expect;
var propertyMap = require('..//hooks//hooks.js');

/**
 * This sections contains all of the generic functions of the framework. To remove duplicate code at page level, Created one section for all generic functions.
 */
var commonFunction = function () {

    //--------------------------Verify text of an element----------------------------

    this.textOnElement = async function (path, value) {
        browser.logger.info("Getting the text from webelement :" + path);
        browser.logger.info("Expected text would be :" + value);
        let expectedText = await element(by.xpath(path)).getText()
        await expect(expectedText).to.equal(value);
        await browser.logger.debug("Text on webelement :" + path + " Should be equal to " + value)

    };

       //-----------------------------Click on element----------------------------

    this.clickOnElement = async function (path) {
        browser.logger.info("Clicking on webelement :" + path)
        await element(by.xpath(path)).click();
        browser.logger.debug("successfully clicked on webelement :" + path)
        return await browser.sleep(propertyMap["smallWait"]);
    };

//-----------------------------------Verify current URL------------------------------

    this.verifyURL = async function (url) {
        browser.logger.info("Expected URL is: " + url);
        let currentUrl = await browser.getCurrentUrl();
        await expect(currentUrl).to.equal(url);
        await browser.logger.debug("Current URL: " + currentUrl + " Should be equal to: " + url);
    };

//-----------------------------------Verify current Title------------------------------

    this.verifyTitle = async function (title) {
        browser.logger.info("Expected title of the page is: " + title);
        let currentTitle = await browser.getTitle();
        await expect(currentTitle).to.equal(title);
        await browser.logger.debug("Current Title of page is : " + currentTitle + " Should be equal to: " + title);
    };

    //-----------------------------------Set text to webelement------------------------------

    this.setText = async function (path, text) {
        await element(by.xpath(path)).sendKeys(text);
        browser.logger.info("Text " + text + " is set on webelement: " + path);
    };
}
module.exports = new commonFunction();