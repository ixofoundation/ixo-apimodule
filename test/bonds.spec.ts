import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL, REST_URL} from '../src/common/dummyData';
import CryptoUtil from "./util/cryptoUtil";
import {fail} from "assert";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);
let cryptoUtil = new CryptoUtil()

const bondSovrinDid = {
  did: "did:ixo:U7GK8p8rVhJMKhBVRCJJ8c",
  verifyKey: "FmwNAfvV2xEqHwszrVJVBR3JgQ8AFCQEVzo1p6x4L8VW",
  encryptionPublicKey: "domKpTpjrHQtKUnaFLjCuDLe2oHeS4b1sKt7yU9cq7m",
  secret: {
    seed: "933e454dbcfc1437f3afc10a0cd512cf0339787b6595819849f53707c268b053",
    signKey: "Aun1EpjR1HQu1idBsPQ4u4C4dMwtbYPe1SdSC5bUerFC",
    encryptionPrivateKey: "Aun1EpjR1HQu1idBsPQ4u4C4dMwtbYPe1SdSC5bUerFC"
  }
}

const userSovrinDid = {
  did: "did:ixo:4XJLBfGtWSGKSz4BeRxdun",
  verifyKey: "2vMHhssdhrBCRFiq9vj7TxGYDybW4yYdrYh9JG56RaAt",
  encryptionPublicKey: "6GBp8qYgjE3ducksUa9Ar26ganhDFcmYfbZE9ezFx5xS",
  secret: {
    seed: "38734eeb53b5d69177da1fa9a093f10d218b3e0f81087226be6ce0cdce478180",
    signKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh",
    encryptionPrivateKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh"
  }
}

const createPayload = {
  bond_did: bondSovrinDid.did,
  token: "token1",
  name: "A B C",
  description: "Description about A B C",
  function_type: "power_function",
  function_parameters: [
    {
      param: "m",
      value: "12"
    },
    {
      param: "n",
      value: "2"
    },
    {
      param: "c",
      value: "100"
    },
  ],
  creator_did: userSovrinDid.did,
  pub_key: userSovrinDid.verifyKey,
  reserve_tokens: ["res"],
  tx_fee_percentage: "0.500000000000000000",
  exit_fee_percentage: "0.100000000000000000",
  fee_address: "ixo1nnxvyr6hs0sglppqzw4v5s9r5dwh89423xu5zp",
  max_supply: {
    denom: "token1",
    amount: "1000000"
  },
  order_quantity_limits: [
    {
      denom: "token1",
      amount: "200"
    }
  ],
  sanity_rate: "0.000000000000000000",
  sanity_margin_percentage: "0.000000000000000000",
  allow_sells: "true",
  batch_blocks: "1",
}

const buyPayload = {
  buyer_did: userSovrinDid.did,
  pub_key: userSovrinDid.verifyKey,
  amount: {
    denom: "token1",
    amount: "1",
  },
  max_prices: [
    {
      denom: "res",
      amount: "100000",
    }
  ],
  bond_did: bondSovrinDid.did,
}

const sellPayload = {
  seller_did: userSovrinDid.did,
  pub_key: userSovrinDid.verifyKey,
  amount: {
    denom: "token1",
    amount: "1",
  },
  bond_did: bondSovrinDid.did,
}

// N.B: test assumes that address ixo1x2x0thq6x2rx7txl0ujpyg9rr0c8mc8ad904xw has at least 2 ixo tokens

describe('Bonds functions', () => {
  before(function (done) {
    this.timeout(10000)
    const credentials: any[] = null;  // just to have explicit any[]
    let didPayload = {
      didDoc: {
        did: userSovrinDid.did,
        pubKey: userSovrinDid.verifyKey,
        credentials: credentials,
      }
    };
    ixo.user.getSignData(didPayload, REST_URL).then((response: any) => {
      if (response.sign_bytes && response.fee) {
        const signature = cryptoUtil.getSignatureForSignBytes(userSovrinDid, response.sign_bytes)
        ixo.user.registerUserDidWithFee(didPayload, signature, response.fee)
          .then((response: any) => {
            if (JSON.stringify(response).includes('hash')) {
              setTimeout(function () {
                ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
                  console.log('RESPONSE DID: ' + JSON.stringify(response));
                  return done();
                });
              }, 6000);
            }
          })
          .catch((err: any) => {
            fail(err)
          });
      } else {
        return fail(response)
      }
    })
  });

  it('should create bond', () => {
    ixo.bonds
      .create(createPayload, cryptoUtil.getSignatureForPayload(userSovrinDid, createPayload), REST_URL)
      .then((response: string) => {
        console.log('Bonds create response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should buy', () => {
    ixo.bonds
      .buy(buyPayload, cryptoUtil.getSignatureForPayload(userSovrinDid, buyPayload), REST_URL)
      .then((response: string) => {
        console.log('Bonds buy response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should sell', () => {
    ixo.bonds
      .sell(sellPayload, cryptoUtil.getSignatureForPayload(userSovrinDid, sellPayload), REST_URL)
      .then((response: string) => {
        console.log('Bonds sell response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
});
