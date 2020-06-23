import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL, PDSUrl, projectData} from '../src/common/dummyData';
import CryptoUtil from './util/cryptoUtil';
import {ISovrinDidModel} from '../src/common/models';
import {fail} from "assert";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);

let cryptoUtil = new CryptoUtil();

const sovrinDid: ISovrinDidModel = {
  did: "did:ixo:U4tSpzzv91HHqWW1YmFkHJ",
  verifyKey: "FkeDue5it82taeheMprdaPrctfK3DeVV9NnEPYDgwwRG",
  encryptionPublicKey: "DtdGbZB2nSQvwhs6QoN5Cd8JTxWgfVRAGVKfxj8LA15i",
  secret: {
    seed: "6ef0002659d260a0bbad194d1aa28650ccea6c6862f994dfdbd48648e1a05c5e",
    signKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR",
    encryptionPrivateKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR"
  }
}

const credentials: any[] = [];  // just to have explicit any[]
const didPayload = {
  didDoc: {
    did: sovrinDid.did,
    pubKey: sovrinDid.verifyKey,
    credentials: credentials
  }
}

const statusData = {
  projectDid: 'did:ixo:111',  // Change to actual project !!!
  status: 'PENDING',
  txnId: '1111111'
}

describe('Project functions', () => {
  before(function (done) {
    this.timeout(10000)
    ixo.utils.getSignData(didPayload, "did/AddDid")
      .then((response: any) => {
        if (response.sign_bytes && response.fee) {
          const signature = cryptoUtil.getSignatureForSignBytes(sovrinDid, response.sign_bytes)
          ixo.user.registerUserDid(didPayload, signature, response.fee)
            .then((response: any) => {
              if (JSON.stringify(response).includes('hash')) {
                setTimeout(function () {
                  ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
                    console.log('RESPONSE DID: ' + JSON.stringify(response));
                    return done()
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
      .catch((err) => {
        return fail(err)
      })
  });

  it('should create new project', () => {
    ixo.project
      .createProject(projectData, cryptoUtil.getSignatureForPayload(sovrinDid, projectData), PDSUrl)
      .then((response: any) => {
        console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should return list of projects', () => {
    ixo.project
      .listProjects()
      .then((response: any) => {
        console.log('Project list: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should update project status', () => {
    ixo.project
      .updateProjectStatus(statusData, cryptoUtil.getSignatureForPayload(sovrinDid, statusData), PDSUrl)
      .then((response: any) => {
        console.log('Project list: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  /* it('should return project with Did', () => {
    ixo.project
      .getProjectByProjectDid(projectDid)
      .then((response: any) => {
        console.log('Project: ' + success(JSON.stringify(response.result, null, '\t')));
        expect(response.result).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });  */
});
