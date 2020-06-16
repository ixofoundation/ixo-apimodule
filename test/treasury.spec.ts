import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL, CHAIN_URL, REST_URL} from '../src/common/dummyData';
import CryptoUtil from "./util/cryptoUtil";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);
let cryptoUtil = new CryptoUtil()

const sovrinDid = {
  did: "did:ixo:4XJLBfGtWSGKSz4BeRxdun",
  verifyKey: "2vMHhssdhrBCRFiq9vj7TxGYDybW4yYdrYh9JG56RaAt",
  encryptionPublicKey: "6GBp8qYgjE3ducksUa9Ar26ganhDFcmYfbZE9ezFx5xS",
  secret: {
    seed: "38734eeb53b5d69177da1fa9a093f10d218b3e0f81087226be6ce0cdce478180",
    signKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh",
    encryptionPrivateKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh"
  }
}

const sendPayload = {
  pub_key: sovrinDid.verifyKey,
  from_did: sovrinDid.did,
  to_did: "did:ixo:4XJLBfGtWSGKSz4BeRxaaa",
  amount: [
    {
      denom: "ixo",
      amount: "1",
    }
  ],
}

const oracleMintPayload = {
  pub_key: sovrinDid.verifyKey,
  oracle_did: sovrinDid.did,
  to_did: "did:ixo:4XJLBfGtWSGKSz4BeRxaaa",
  amount: [
    {
      denom: "ixo",
      amount: "1",
    }
  ],
  proof: "dummy_proof",
}

const oracleBurnPayload = {
  pub_key: sovrinDid.verifyKey,
  oracle_did: sovrinDid.did,
  from_did: "did:ixo:4XJLBfGtWSGKSz4BeRxaaa",
  amount: [
    {
      denom: "ixo",
      amount: "1",
    }
  ],
  proof: "dummy_proof",
}

// N.B: test assumes that address ixo1x2x0thq6x2rx7txl0ujpyg9rr0c8mc8ad904xw has at least 2 ixo tokens

describe('Treasury functions', () => {
  before(function (done) {
    this.timeout(10000)
    const credentials: any[] = null;  // just to have explicit any[]
    let didPayload = {
      didDoc: {
        did: sovrinDid.did,
        pubKey: sovrinDid.verifyKey,
        credentials: credentials,
      }
    };
    ixo.user.registerUserDid(didPayload, cryptoUtil.getSignatureForPayload(sovrinDid, didPayload)).then((response: any) => {
      if (JSON.stringify(response).includes('hash')) {
        setTimeout(function () {
          ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
            console.log('RESPONSE DID: ' + JSON.stringify(response));
            return done();
          });
        }, 6000);
      }
    });
  });

  it('should send tokens via RPC', () => {
    ixo.treasury
      .sendTokensViaRpc(sendPayload, cryptoUtil.getSignatureForPayload(sovrinDid, sendPayload), CHAIN_URL)
      .then((response: string) => {
        console.log('Treasury send response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should send tokens via REST', () => {
    ixo.treasury
      .sendTokensViaRest(sendPayload, cryptoUtil.getSignatureForPayload(sovrinDid, sendPayload), REST_URL)
      .then((response: string) => {
        console.log('Treasury send response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should oracle-mint tokens via REST', () => {
    ixo.treasury
      .oracleMintTokensViaRest(oracleMintPayload, cryptoUtil.getSignatureForPayload(sovrinDid, oracleMintPayload), REST_URL)
      .then((response: string) => {
        console.log('Treasury oracle-mint response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should oracle-burn tokens via REST', () => {
    ixo.treasury
      .oracleBurnTokensViaRest(oracleBurnPayload, cryptoUtil.getSignatureForPayload(sovrinDid, oracleBurnPayload), REST_URL)
      .then((response: string) => {
        console.log('Treasury oracle-burn response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
});
