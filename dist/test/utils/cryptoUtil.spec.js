"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cryptoUtil_1 = require("../../src/utils/cryptoUtil");
var chai_1 = require("chai");
require("mocha");
var chalk = require('chalk');
var logger = chalk.bold.green;
var cryptoUtil = new cryptoUtil_1.CryptoUtil();
var mnemonic;
var sdid;
var signature;
var testJson = {
    "employees": [
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" }
    ]
};
describe('CryptoUtil functions', function () {
    it('should return mnemonic', function () {
        mnemonic = cryptoUtil.generateMnemonic();
        console.log('Mnemonic: ' + logger(mnemonic));
        chai_1.expect(mnemonic).to.be.a('string');
    });
    it('should generate SovrinDID', function () {
        sdid = cryptoUtil.generateSovrinDID(mnemonic);
        console.log('SovrinDID: ' + logger(JSON.stringify(sdid, null, '\t')));
        chai_1.expect(sdid).to.be.an.instanceof(Object);
    });
    it('should generate document signature', function () {
        signature = cryptoUtil.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, JSON.stringify(testJson));
        console.log('Document Signature: ' + logger(signature));
        chai_1.expect(sdid).to.be.an.instanceof(Object);
    });
    it('should verify document signature', function () {
        var isValidSignature = cryptoUtil.verifyDocumentSignature(signature, sdid.verifyKey);
        console.log('Valid Signature: ' + logger(isValidSignature));
        chai_1.expect(isValidSignature).to.be.true;
    });
});
