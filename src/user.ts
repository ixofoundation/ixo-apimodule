import {Signature} from './common/models';
import Config from './config';
import {sendGetJSON, sendPostJSON} from './utils/http';

const base58 = require('bs58')

require('es6-promise');

class User {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  generateLedgerObjectJson = (didDoc: any, signature: string, pubKey: string, fee: object) => {
    return {
      msg: [{type: "did/AddDid", value: didDoc}],
      fee,
      signatures: [{
        signature: signature,
        pub_key: {
          type: "tendermint/PubKeyEd25519",
          value: base58.decode(pubKey).toString('base64'),
        }
      }]
      // memo: "this is an optional memo",
    };
  }

  registerUserDid(data: any, signature: Signature, fee: object, mode?: string): Promise<any> {
    const {signatureValue, publicKey} = signature;
    const tx = this.generateLedgerObjectJson(data, signatureValue, publicKey, fee);
    return sendPostJSON(this.config.getBlockSyncUrl() + '/api/blockchain/txs', {
      tx,
      mode: mode || "block"
    })
  }

  getDidDoc(did: string) {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
  }
}

export default User;
