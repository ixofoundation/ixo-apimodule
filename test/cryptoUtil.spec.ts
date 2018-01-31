import {expect}          from 'chai';
import 'mocha';
import {ISovrinDidModel} from "../src/common/models";
import { Ixo } from '../index';

const chalk = require('chalk');
const logger = chalk.bold.green;

const ixo = new Ixo('https://ixo-node.herokuapp.com/');
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
        mnemonic = ixo.cryptoUtil.generateMnemonic();
        console.log('Mnemonic: ' + logger(mnemonic));
        expect(mnemonic).to.be.a('string');
    });

    it('should generate SovrinDID', () => {
        sdid = ixo.cryptoUtil.generateSovrinDID(mnemonic);
        console.log('SovrinDID: ' + logger(JSON.stringify(sdid, null, '\t')));
        expect(sdid).to.be.an.instanceof(Object);
    });

    it('should generate document signature', () => {
        signature = ixo.cryptoUtil.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, JSON.stringify(testJson));
        console.log('Document Signature: ' + logger(signature));
        expect(sdid).to.be.an.instanceof(Object);
    });


    it('should verify document signature', () => {
        var isValidSignature: boolean = ixo.cryptoUtil.verifyDocumentSignature(signature, sdid.verifyKey);
        console.log('Valid Signature: ' + logger(isValidSignature));
        expect(isValidSignature).to.be.true;
    });


});