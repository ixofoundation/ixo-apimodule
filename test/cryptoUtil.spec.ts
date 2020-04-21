import {expect} from 'chai';
import 'mocha';
import {ISovrinDidModel} from "../src/common/models";
import CryptoUtil from './util/cryptoUtil';

const chalk = require('chalk');
const logger = chalk.bold.green;
let mnemonic: string;
let sdid: ISovrinDidModel;
let signature: string;
let ecdsaKeyPair: any;
let ecdsaSignature: any;
let cryptoUtil = new CryptoUtil();

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

  it('should generate ECDSA keypair', () => {
    ecdsaKeyPair = cryptoUtil.generateEcdsaKeyPair();
    console.log('Ecdsa keypair: ' + logger(ecdsaKeyPair));
    expect(ecdsaKeyPair).to.be.an.instanceof(Object);
  });

  it('should sign Json using ECDSA key', () => {
    ecdsaSignature = cryptoUtil.signPayloadUsingEcdsaKey(testJson, ecdsaKeyPair);
    console.log('Ecdsa signature: ' + logger(ecdsaSignature));
    expect(ecdsaSignature).to.be.an.instanceof(Object);
  });

  it('should verify the ECDSA signature', () => {
    console.log('Is valid ECDSA signature: ' + logger(cryptoUtil.verifyEcdsaSignature(ecdsaKeyPair, ecdsaSignature, testJson)));
    expect(cryptoUtil.verifyEcdsaSignature(ecdsaKeyPair, ecdsaSignature, testJson)).to.be.true;
  });


});
