var fs = require('fs');
var dateTime = require('node-datetime');
const {
    zip
} = require('zip-a-folder');

/***
 *Function Use: Create a zip folder of report/index.html with current time stamp
 */


var util = function () {
    this.zip = async function (source) {
        var destination = await source + '.zip'
        try {
            await zip(source, destination);
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    };

    this.copyFile = async function (source, destination) {
        try {
            await fs.copyFile(source, destination, async (err) => {
                if (err) {
                    await commonLogger.error(err);
                    throw err;
                }
            });
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    };

    this.archiveReport = async function (report) {

        try {
            var temp = await report.split("/");
            var currentDateTime = await this.getCurrentDateTime();
            var dateFormat = await currentDateTime.replaceAll(" ", "_");
            var dateFormatModify = await dateFormat.replaceAll(":", "_");
            dateFormatModify = await dateFormatModify.replaceAll("-", "_");
            var arcFolder = await report.replace(temp[temp.length - 1], dateFormatModify);
            await this.createFolder(arcFolder);
            var destination = await arcFolder + "/" + temp[temp.length - 1];
            await this.copyFile(report, destination);
            await this.zip(arcFolder);
            await this.deleteFolder(arcFolder);
            commonLogger.info("Archived Folder : " + arcFolder);
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    }

    String.prototype.replaceAll = async function (search, replacement) {
        try {
            var target = this;
            return await target.replace(new RegExp(search, 'g'), replacement);
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    };

    this.getCurrentDateTime = async function () {
        try {
            var dt = await dateTime.create();
            return await dt.format('Y-m-d H:M:S');
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    };

    this.createFolder = async function (folder) {
        try {
            if (await !fs.existsSync(folder)) {
                await fs.mkdirSync(folder);
            }
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    }

    this.deleteFolder = async function (path) {

        try {
            if (await fs.existsSync(path)) {
                await fs.readdirSync(path).forEach(async function (file, index) {
                    var curPath = path + "/" + file;
                    if (await fs.lstatSync(curPath).isDirectory()) {
                        await deleteFolder(curPath);
                    } else {
                        await fs.unlinkSync(curPath);
                    }
                });
                await fs.rmdirSync(path);
            }
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    };

    this.createReportFolder = async function () {
        try {
            var currentDateTime = await this.getCurrentDateTime();
            var dateFormat = await currentDateTime.replaceAll(" ", "_");
            var dateFormatModify = await dateFormat.replaceAll(":", "_");
            dateFormatModify = await dateFormatModify.replaceAll("-", "_");
            var arcFolder = "./reports/";
            await this.createFolder(arcFolder);
            await this.createFolder(arcFolder + dateFormatModify);
        } catch (e) {
            await commonLogger.error(e);
            throw e;
        }
    }

    this.createBlankJson = function (file) {
        // appendFile function with filename, content and callback function
        fs.appendFile(file, '', function (err) {
            if (e) throw e;
            commonLogger.log('File is created successfully.');
        });
    }
};

module.exports = new util();