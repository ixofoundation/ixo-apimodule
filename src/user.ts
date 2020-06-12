import {Signature} from './common/models';
import Config from './config';
import {sendGetJSON} from './utils/http';

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

  registerUserDid(data: any, signature: Signature): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
  }

  getDidDoc(did: string) {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
  }
}

export default User;
