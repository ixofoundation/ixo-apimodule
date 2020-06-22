import {Signature} from './common/models';
import Config from './config';
import {sendGetJSON} from './utils/http';

require('es6-promise');

class User {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  generateLedgerObjectJson = (didDoc: any, signature: string, created: any, fee: object) => {
    return JSON.stringify({
      payload: [{type: "did/AddDid", value: didDoc}],
      fee,
      signatures: [{signatureValue: signature, created: created}]
      // memo: "this is a memo",
    });
  }

  registerUserDid(data: any, signature: Signature, fee: object): Promise<any> {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created, fee);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
  }

  getDidDoc(did: string) {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
  }
}

export default User;
