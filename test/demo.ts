import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {ixoDid1, ixoDid2, ixoDid3, projectData} from '../src/common/dummyData';
import CryptoUtil from './util/cryptoUtil';
import {ISovrinDidModel} from '../src/common/models';
import {fail} from "assert";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

// DEMO ASSUMPTIONS
// - Blockchain, Blocksync, Cellnode (and accompanying tools such as ixo-pol) are all running and connected properly
// - For all of these DIDs:
//     (1) did:ixo:4XJLBfGtWSGKSz4BeRxdun
//     (2) did:ixo:U4tSpzzv91HHqWW1YmFkHJ
//     (3) did:ixo:UKzkhVSHc3qEFva5EY2XHt
//     ...the following assumptions apply:
//   - The DID is not yet registered with the blockchain and blocksync. If it is, DID registration can be skipped.
//   - The address underlying the DID has enough 'uixo' tokens to pay gas fees.
//     - To get this address, run query: <blockchainUrl>:1317/pubKeyToAddr/<ixoDidVerifyKey>, where <blockchainUrl> is
//       the IP (or equivalent) of the blockchain, and <ixoDidVerifyKey> is the verifyKey in the appropriate ixoDid
//     - To get the token balance of this address, run query: <blockchainUrl>:1317/bank/balances/<address>
//
// DEMO INSTRUCTIONS
// - TO change the Blocksync and PDS (Cellnode) URLs, refer to the *_URL variables below
// - Once the project has been created, the below constant should be updated with the proper project DID
const projectDid = "did:ixo:Qg97mbjVJkMuZAqsmBJYNo" // TODO: set me to the project DID
//
// OTHER DEMO NOTES
// - Query the project from the blockchain: <blockchainUrl>:1317/project/<projectDid>
// - The process can be run multiple times, since a new project with a unique project DID will be created each time

const CELLNODE_URL = 'http://localhost:5000/';
const BLOCKSYNC_URL = 'http://localhost:80';
const ixo = new Ixo(BLOCKSYNC_URL);
let cryptoUtil = new CryptoUtil();

function status_updated_to(new_status: string) {
  return function () {
    // One of the ways to ensure the project was updated is to search for it
    ixo.project.getProjectByProjectDid(projectDid)
      .then((response: any) => {

        // We expect this to return the entire project, with status:"<THE_NEW_STATUS>"
        console.log('Expected status: ' + new_status)
        console.log('Project: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  }
}

function update_status_to(new_status: string) {
  return function () {
    const msgUpdateProjectStatus = {
      projectDid: projectDid,
      status: new_status,
      txnId: '1111111' // This does not seem to make a big difference
    }

    // Any further project status updates are in our hands, so let's update the status to PENDING
    const signature = cryptoUtil.getSignatureForPayload(ixoDid1, msgUpdateProjectStatus)
    ixo.project.updateProjectStatus(msgUpdateProjectStatus, signature, CELLNODE_URL)
      .then((response: any) => {

        // At this stage, we cannot know for sure whether or not the project was updated, but we can get an idea (error => definitely not created)
        console.log('Project update response: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  }
}

function register_user_did(ixoDid: ISovrinDidModel) {
  return function () {
    const msgAddDid = {
      did: ixoDid.did,
      pubKey: ixoDid.verifyKey
    }

    // Get signature data for did/AddDid
    ixo.utils.getSignData(msgAddDid, "did/AddDid", ixoDid.verifyKey)
      .then((response: any) => {

        // If the response contains the signature bytes and the fee proceed
        if (response.sign_bytes && response.fee) {

          // Sign the signature bytes using the ixoDid and submit using registerUserDid
          const signature = cryptoUtil.getSignatureForSignBytes(ixoDid, response.sign_bytes)
          ixo.user.registerUserDid(msgAddDid, signature, response.fee)
            .then((response: any) => {

              // If the response does not contain any error code, then no error occurred and the DID was registered
              if (!response.code) {

                // To double-check, we will try to get the DID from Blocksync
                ixo.user.getDidDoc(msgAddDid.did)
                  .then((response: any) => {

                    // If the response contains the DID and Pubkey, then the query was successful
                    if (response.did && response.publicKey) {

                      console.log('Created DID: ' + JSON.stringify(response));
                      return success()
                    } else {
                      return fail(response)
                    }
                  });
              } else {
                return fail(response)
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
  }
}

function create_agent(agentIxoDid: ISovrinDidModel, role: string) {
  return function () {
    const msgCreateAgent = {
      email: 'test@ixo.com',
      name: 'Test',
      role: role,
      agentDid: agentIxoDid.did,
      projectDid: projectDid
    }

    // Sign and submit an agent creation request to Cellnode
    const signature = cryptoUtil.getSignatureForPayload(agentIxoDid, msgCreateAgent)
    ixo.agent.createAgent(msgCreateAgent, signature, CELLNODE_URL).then((response: any) => {
      console.log(response)
    }).catch((result: Error) => {
      console.log(error(result));
    });
  }
}

const projectCreatorDid = ixoDid1;
const agent1IxoDid = ixoDid1;
const agent2IxoDid = ixoDid2;
const claimerIxoDid = ixoDid1;
const evaluatorIxoDid = ixoDid2;

describe('Demo', () => {

  it('should register DID 1', register_user_did(ixoDid1))
  it('should register DID 2', register_user_did(ixoDid2))
  it('should register DID 3', register_user_did(ixoDid3))

  it('should create new project', () => {
    // Sign and submit a project creation request to Cellnode
    const signature = cryptoUtil.getSignatureForPayload(projectCreatorDid, projectData)
    ixo.project.createProject(projectData, signature, CELLNODE_URL)
      .then((response: any) => {
        // At this stage, we cannot know for sure whether or not the project was created, but we can get an idea (error => definitely not created)
        console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should return list of projects and confirm that the project was created', () => {

    // One of the ways to ensure the project was created was to search for it
    ixo.project.listProjects()
      .then((response: any) => {

        // The latest project created is the last project in the list, so that is where we expect our project to be.
        // As an additional success check, the entry should have status:"CREATED", indicating that it was successfully
        // ledgered onto the blockchain and that the on-chain project status was also successfully updated to "CREATED".
        console.log('Project list: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });

  it('should create agent 1', create_agent(agent1IxoDid, 'SA'));  // SA => claimer
  it('should create agent 2', create_agent(agent2IxoDid, 'EA'));  // EA => evaluator

  it('should confirm that the agents were created', () => {
    const listData = {projectDid: projectDid};

    const signature = cryptoUtil.getSignatureForPayload(projectCreatorDid, listData)
    ixo.agent.listAgentsForProject(listData, signature, CELLNODE_URL).then((response: any) => {
      console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
      expect(response.result).to.not.equal(null);
    }).catch((result: Error) => {
      console.log(error(result));
    });
  })

  it('should update project status to PENDING', update_status_to("PENDING"));
  it('should return the project with status updated to PENDING', status_updated_to("PENDING"));

  it('should update project status to FUNDED', update_status_to("FUNDED"));
  it('should return the project with status updated to FUNDED', status_updated_to("FUNDED"));

  it('should update project status to STARTED', update_status_to("STARTED"));
  it('should return the project with status updated to STARTED', status_updated_to("STARTED"));

  // NB: if fees were set up for the project (by default no), the project should be appropriately funded for claims

  it('should create new claim', () => {
    // Note: only projectDid is required. Other values (name, weight, claimid, ...) can be string/object/array/
    const msgCreateClaim = {name: 'doggy bag', weight: '2kg', claimid: "123", projectDid: projectDid};

    const signature = cryptoUtil.getSignatureForPayload(claimerIxoDid, msgCreateClaim)
    ixo.claim.createClaim(msgCreateClaim, signature, CELLNODE_URL).then((response: any) => {
      console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
    }).catch((result: Error) => {
      console.log(error(result));
    });
  });

  // NB: if fees were set up for the project (by default no), the project should be appropriately funded for evaluations

  it('should evaluate claim', () => {
    // Note: only status and projectDid are required. Other values (name, weight, claimid, ...) can be string/object/array/
    const msgEvaluateClaim = {
      claimId: "94519f45e2c4c82cf67b62416414341b8e2dded1e55056bfb82075b169f536cd",
      status: '1',
      projectDid: projectDid
    };

    const signature = cryptoUtil.getSignatureForPayload(evaluatorIxoDid, msgEvaluateClaim)
    ixo.claim.evaluateClaim(msgEvaluateClaim, signature, CELLNODE_URL).then((response: any) => {
      console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
    }).catch((result: Error) => {
      console.log(error(result));
    });
  });

  it('should update project status to STOPPED', update_status_to("STOPPED"));
  it('should return the project with status updated to STOPPED', status_updated_to("STOPPED"));

  // TODO: need to fix bug (?) which does not allow us to go to PAIDOUT if there are zero funds

  it('should update project status to PAIDOUT', update_status_to("PAIDOUT"));
  it('should return the project with status updated to PAIDOUT', status_updated_to("PAIDOUT"));
});
