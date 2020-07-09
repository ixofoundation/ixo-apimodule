import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL} from '../src/common/dummyData';
import {Signature} from "../src/common/models";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);

const didPayload = {
  did: "did:sov:Eu7Aru9sH4VB5GqEaohnJe",
  pubKey: "8aMcV6btrGHHrURQHjBEV7tmvLj18BnQhj3pAy1YxBR4",
}

// const sovrinDid = {
//   did: "Eu7Aru9sH4VB5GqEaohnJe",
//   verifyKey: "8aMcV6btrGHHrURQHjBEV7tmvLj18BnQhj3pAy1YxBR4",
//   secret: {
//     seed: "7f87d50a77d366498eff8bd8938568fcc8d55b68d7112d93e2d533d62251518e",
//     signKey: "9apugW436UsVCBmYZdoWxwETFSpjoizhTKqRFdgBiEL5"
//   }
// }

const signature: Signature = {
  type: "ed25519-sha-256",
  created: "2020-04-21T14:39:01.737Z",
  creator: "did:sov:Eu7Aru9sH4VB5GqEaohnJe",
  signatureValue: "KpZecbwgoNpuVAPgl3YQ+sEoHOcs9znM4Mx4VFSHrzAhhv7nAoeYCW0qwp9fThjVz1J8FJMN6Bknhfyn/Hq3DQ==",
  publicKey: undefined, // encryptionPublicKey from above sovrinDid
}

const fee = {
  "amount": [
    {
      "denom": "uixo",
      "amount": "5000"
    }
  ],
  "gas": "200000"
}

describe('User functions', () => {
  it('should register user did', () => {
    ixo.user
      .registerUserDid(didPayload, signature, fee)
      .then((response: string) => {
        console.log('User DID registration response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
  it('should return user did', () => {
    ixo.user
      .getDidDoc(didPayload.did)
      .then((response: any) => {
        console.log('User get DidDoc response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
});
