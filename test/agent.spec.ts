import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import CryptoUtil from './util/cryptoUtil';
import {BLOCKSYNC_URL, PDSUrl} from '../src/common/dummyData';
import {ISovrinDidModel} from "../src/common/models";

let cryptoUtil = new CryptoUtil();

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo(BLOCKSYNC_URL);

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

const agentData = {
  email: 'don@ixo.com',
  name: 'Don',
  role: 'SA',
  agentDid: '1234',
  projectDid: 'did:ixo:111'
};

const agentUpdate = {
  agentDid: 'did:sov:111',
  status: "DECLINED",
  version: 1,
  projectDid: 'did:ixo:111'
};

const listData = {
  projectDid: 'did:ixo:111'
};

describe('Agent functions', () => {

  it('should create an agent', () => {
    ixo.agent.createAgent(agentData, cryptoUtil.getSignatureForPayload(sovrinDid, agentData), PDSUrl).then((response: any) => {
      console.log(response)
      // agentUpdate = { agentTx: response.result.tx, status: "Approved" }
    }).catch((result: Error) => {
      console.log(error(result));
    });
  });

  it('should list agents for project', () => {
    ixo.agent.listAgentsForProject(listData, cryptoUtil.getSignatureForPayload(sovrinDid, listData), PDSUrl).then((response: any) => {
      console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
      expect(response.result).to.not.equal(null);
    }).catch((result: Error) => {
      console.log(error(result));
    });
  });

  it('update agent status', () => {
    ixo.agent.updateAgentStatus(agentData, cryptoUtil.getSignatureForPayload(sovrinDid, agentData), PDSUrl).then((response: any) => {
      console.log('Agent status update: ' + success(JSON.stringify(response, null, '\t')));
      expect(response.result).to.not.equal(null);
    }).catch((result: Error) => {
      console.log(error(result));
    });
  });

});
