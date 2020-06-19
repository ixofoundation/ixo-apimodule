import {Signature} from './common/models';
import Config from './config';
import {sendGetJSON, sendPostJSON} from './utils/http';

require('es6-promise');

class User {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
    return JSON.stringify({
      payload: [{type: "did/AddDid", value: didDoc}],
      // fee: {amount: [{denom: "ixo", amount: "5000"}], gas: "200000"},
      signatures: [{signatureValue: signature, created: created}],
      // memo: "this is a memo",
    });
  }

  generateLedgerObjectJsonWithFee = (didDoc: any, signature: string, created: any, fee: object) => {
    return JSON.stringify({
      payload: [{type: "did/AddDid", value: didDoc}],
      fee,
      signatures: [{signatureValue: signature, created: created}]
      // memo: "this is a memo",
    });
  }

  registerUserDid(data: any, signature: Signature): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
  }

  registerUserDidWithFee(data: any, signature: Signature, fee: object): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJsonWithFee(data, signatureValue, created, fee);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
  }

  registerUserDidRpcWithFee(data: any, signature: Signature, CHAINUrl: string, fee: object): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJsonWithFee(data, signatureValue, created, fee);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(CHAINUrl + '/broadcast_tx_commit?tx=0x' + ledgerObjectUppercaseHex);
  }

  registerUserDidRestWithFee(data: any, signature: Signature, RESTUrl: string, fee: object): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJsonWithFee(data, signatureValue, created, fee);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();
    const broadcastFormat = {
      "mode": "block",
      "tx": ledgerObjectUppercaseHex
    }

    return sendPostJSON(RESTUrl + '/txs', broadcastFormat);
  }

  getDidDoc(did: string) {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
  }
}

export default User;
