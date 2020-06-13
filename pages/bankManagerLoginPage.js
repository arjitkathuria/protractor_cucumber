let chai = require('chai');
let expect = chai.expect;
let propertyMap = require('../hooks/hooks.js');
let object = require('..//objectRepository//bankManagerLoginOR.json');
let testData = require('..//testData//testData.json');
const {
    toCamelCase
} = require("../utility/string.js");
/**
 * This sections contains some of the methods which is specifically for the bank manager login page
 */
let bankManagerLoginPage = function () {

    //------------------------------Click on element from bankManagerLoginOR.json ---------------------

    this.clickOn = async function (string) {
        const elementName = await toCamelCase(string);
        await element(by.xpath(object.Locators[elementName])).click();
        browser.logger.info("Clicked on webelement :" + object.Locators[elementName]);
        return await browser.sleep(propertyMap["mediumWait"]);
    };

    //------------------------------Verify alert text and accept it----------------------------------

    this.verifyTextOnalert = async function (string) {
        const elementName = await toCamelCase(string);
        browser.logger.info("Alert is on the screen");
        alert = browser.switchTo().alert();
        alertText = await alert.getText();
        browser.logger.info("Switching the control to the alert, Text on alert is " + alertText);
        console.log(testData[elementName]);
        expect(alertText).to.contain(testData[elementName]);
        browser.logger.debug("The text of alert should conatins the text : " + testData.customerCreatedWithAccountnumber);
        return await alert.accept();
    };

    //------------------------------Select drop down from the list----------------------------------

    this.selectCustomerFromDropdown = async function (string) {
        browser.logger.info("Selecting " + string + "option from the dropdown");
        await element(by.cssContainingText('option', string)).click();
        return browser.sleep(propertyMap["smallWait"]);
    };

    //------------------------------Delete custmer from the list--------------------------------------

    this.deleteCustomer = async function (string) {
        let deleteItem = "//table[@class='table table-bordered table-striped']//td[text()='" + string + "']//parent::tr//button";
        browser.logger.info("Deleting customer name " + string + "from the list");
        await element(by.xpath(deleteItem)).click();
        return browser.sleep(propertyMap["smallWait"]);
    };
};

module.exports = new bankManagerLoginPage();