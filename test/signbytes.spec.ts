import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL, CHAIN_URL, REST_URL} from '../src/common/dummyData';
import CryptoUtil from "./util/cryptoUtil";
import {fail, ok} from "assert";
import Utils from "../src/utils/utils";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);
let cryptoUtil = new CryptoUtil()
let utils = new Utils()

const sovrinDid = {
  did: "did:ixo:U4tSpzzv91HHqWW1YmFkHJ",
  verifyKey: "FkeDue5it82taeheMprdaPrctfK3DeVV9NnEPYDgwwRG",
  encryptionPublicKey: "DtdGbZB2nSQvwhs6QoN5Cd8JTxWgfVRAGVKfxj8LA15i",
  secret: {
    seed: "6ef0002659d260a0bbad194d1aa28650ccea6c6862f994dfdbd48648e1a05c5e",
    signKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR",
    encryptionPrivateKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR"
  }
}

const credentials: any[] = null;  // just to have explicit any[]
const didPayload = {
  didDoc: {
    did: sovrinDid.did,
    pubKey: sovrinDid.verifyKey,
    credentials: credentials
  }
}

describe('User functions', () => {
  it('should register user did with fee using blocksync', () => {
    utils.getSignData(didPayload, "did/AddDid", REST_URL).then((response: any) => {
      if (response.sign_bytes && response.fee) {
        const signature = cryptoUtil.getSignatureForSignBytes(sovrinDid, response.sign_bytes)
        ixo.user.registerUserDidWithFee(didPayload, signature, response.fee)
          .then((response: any) => {
            if (JSON.stringify(response).includes('hash')) {
              setTimeout(function () {
                ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
                  console.log('RESPONSE DID: ' + JSON.stringify(response));
                  return ok(response)
                });
              }, 6000);
            }
          })
          .catch((err) => {
            return fail(err)
          })
      } else {
        return fail(response)
      }
    })
  });

  it('should register user did with fee using REST API', () => {
    utils.getSignData(didPayload, "did/AddDid", REST_URL).then((response: any) => {
      if (response.sign_bytes && response.fee) {
        const signature = cryptoUtil.getSignatureForSignBytes(sovrinDid, response.sign_bytes)
        ixo.user.registerUserDidRestWithFee(didPayload, signature, REST_URL, response.fee)
          .then((response: any) => {
            if (JSON.stringify(response).includes('hash')) {
              setTimeout(function () {
                ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
                  console.log('RESPONSE DID: ' + JSON.stringify(response));
                  return ok(response)
                });
              }, 6000);
            }
          })
          .catch((err) => {
            return fail(err)
          })
      } else {
        return fail(response)
      }
    })
  });

  it('should register user did with fee using RPC', () => {
    utils.getSignData(didPayload, "did/AddDid", REST_URL).then((response: any) => {
      if (response.sign_bytes && response.fee) {
        const signature = cryptoUtil.getSignatureForSignBytes(sovrinDid, response.sign_bytes)
        ixo.user.registerUserDidRpcWithFee(didPayload, signature, CHAIN_URL, response.fee)
          .then((response: any) => {
            if (JSON.stringify(response).includes('hash')) {
              setTimeout(function () {
                ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
                  console.log('RESPONSE DID: ' + JSON.stringify(response));
                  return ok(response)
                });
              }, 6000);
            }
          })
          .catch((err) => {
            return fail(err)
          })
      } else {
        return fail(response)
      }
    })
  });
});
