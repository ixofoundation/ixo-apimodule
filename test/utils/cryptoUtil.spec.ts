import {CryptoUtil} from '../../src/utils/cryptoUtil';
import {expect} from 'chai';
import 'mocha';
import {ISovrinDidModel} from "../../src/models";

const chalk = require('chalk');
const logger = chalk.bold.green;

const cryptoUtil = new CryptoUtil();
let mnemonic: string;
let sdid: ISovrinDidModel;
let signature: string;

var testJson = {
    "employees": [
        {"firstName": "John", "lastName": "Doe"},
        {"firstName": "Anna", "lastName": "Smith"},
        {"firstName": "Peter", "lastName": "Jones"}
    ]
};

describe('CryptoUtil functions', () => {

    it('should return mnemonic', () => {
        mnemonic = cryptoUtil.generateMnemonic();
        console.log('Mnemonic: ' + logger(mnemonic));
        expect(mnemonic).to.be.a('string');
    });

    it('should generate SovrinDID', () => {
        sdid = cryptoUtil.generateSovrinDID(mnemonic);
        console.log('SovrinDID: ' + logger(JSON.stringify(sdid, null, '\t')));
        expect(sdid).to.be.an.instanceof(Object);
    });

    it('should generate document signature', () => {
        signature = cryptoUtil.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, JSON.stringify(testJson));
        console.log('Document Signature: ' + logger(signature));
        expect(sdid).to.be.an.instanceof(Object);
    });


    it('should verify document signature', () => {
        var isValidSignature: boolean = cryptoUtil.verifyDocumentSignature(signature, sdid.verifyKey);
        console.log('Valid Signature: ' + logger(isValidSignature));
        expect(isValidSignature).to.be.true;
    });


});