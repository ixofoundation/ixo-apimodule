import { expect } from 'chai';
import 'mocha';
import { ISovrinDidModel } from "../src/common/models";
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const logger = chalk.bold.green;

const ixo = new Ixo('https://ixo-node.herokuapp.com/', new MockProvider());
let mnemonic: string;
let sdid: ISovrinDidModel;
let signature: string;
let ecdsaKeyPair: any;
let ecdsaSignature: any;

var testJson = {
    "employees": [
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" }
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

    it('should generate ECDSA keypair', () => {
        ecdsaKeyPair = ixo.cryptoUtil.generateEcdsaKeyPair();
        console.log('Ecdsa keypair: ' + logger(ecdsaKeyPair));
        expect(ecdsaKeyPair).to.be.an.instanceof(Object);
    });

    it('should sign Json using ECDSA key', () => {
        ecdsaSignature = ixo.cryptoUtil.signPayloadUsingEcdsaKey(testJson, ecdsaKeyPair);
        console.log('Ecdsa signature: ' + logger(ecdsaSignature));
        expect(ecdsaSignature).to.be.an.instanceof(Object);
    });

    it('should verify the ECDSA signature', () => {
        console.log('Is valid ECDSA signature: ' + logger(ixo.cryptoUtil.verifyEcdsaSignature(ecdsaKeyPair, ecdsaSignature, testJson)));
        expect(ixo.cryptoUtil.verifyEcdsaSignature(ecdsaKeyPair, ecdsaSignature, testJson)).to.be.true;
    });


});