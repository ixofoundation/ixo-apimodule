import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {ixoDid1, ixoDid2, ixoDid3, projectData} from '../src/common/dummyData';
import CryptoUtil from './util/cryptoUtil';
import {ISovrinDidModel} from '../src/common/models';
import {fail, ok} from "assert";

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
// - To change the Blocksync and PDS (Cellnode) URLs, refer to the *_URL variables below
// - This demo is not meant to be run automatically all at once, but rather slowly and one step at a time
// - Once the project has been created, the below constant should be updated with the proper project DID
const projectDid = "" // TODO: set me to the project DID
// - Once a claim has been created, the below constant should be updated with the proper claim ID
const claimId = "" // TODO: set me to the claim ID
//
// OTHER DEMO NOTES
// - Query the project from the blockchain: <blockchainUrl>:1317/project/<projectDid>
// - The process can be run multiple times, since a new project with a unique project DID will be created each time

const CELLNODE_URL = 'https://pds_pandora.ixo.world/';
const BLOCKSYNC_URL = 'https://block_sync_pandora.ixo.world';
const ixo = new Ixo(BLOCKSYNC_URL);
let cryptoUtil = new CryptoUtil();

function registerUserDid(userIxoDid: ISovrinDidModel) {
  return function () {
    const msgAddDid = {
      did: userIxoDid.did,
      pubKey: userIxoDid.verifyKey
    }

    // Get signature data for did/AddDid
    ixo.utils.getSignData(msgAddDid, "did/AddDid", userIxoDid.verifyKey)
      .then((response: any) => {

        // If the response contains the signature bytes and the fee proceed
        if (response.sign_bytes && response.fee) {

          // Sign the signature bytes using the ixoDid and submit using registerUserDid
          const signature = cryptoUtil.getSignatureForSignBytes(userIxoDid, response.sign_bytes)
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

function createProject() {
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
}

function projectCreated() {
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
}

function updateProjectStatusTo(newStatus: string) {
  return function () {
    const msgUpdateProjectStatus = {
      projectDid: projectDid,
      status: newStatus,
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

function projectStatusUpdatedTo(newStatus: string) {
  return function () {
    // One of the ways to ensure the project was updated is to search for it
    ixo.project.getProjectByProjectDid(projectDid)
      .then((response: any) => {

        // We expect this to return the entire project, with status:"<THE_NEW_STATUS>"
        console.log('Expected status: ' + newStatus)
        console.log('Project: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  }
}

function createAgent(agentIxoDid: ISovrinDidModel, agentRole: string) {
  return function () {
    const msgCreateAgent = {
      email: 'test@ixo.com',
      name: 'Test',
      role: agentRole,
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

function updateAgentStatusTo(agentIxoDid: ISovrinDidModel, projectCreatorDid: ISovrinDidModel, agentRole: string) {
  return function () {
    const msgUpdateAgentStatus = {
      role: agentRole,
      agentDid: agentIxoDid.did,
      projectDid: projectDid,
      status: "1"
    }

    // Sign and submit an agent creation request to Cellnode
    const signature = cryptoUtil.getSignatureForPayload(projectCreatorDid, msgUpdateAgentStatus)
    ixo.agent.updateAgentStatus(msgUpdateAgentStatus, signature, CELLNODE_URL).then((response: any) => {
      console.log(response)
    }).catch((result: Error) => {
      console.log(error(result));
    });
  }
}

function agentsCreatedAndApproved() {
  const listData = {projectDid: projectDid};

  const signature = cryptoUtil.getSignatureForPayload(projectCreatorDid, listData)
  ixo.agent.listAgentsForProject(listData, signature, CELLNODE_URL).then((response: any) => {
    console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
    expect(response.result).to.not.equal(null);
  }).catch((result: Error) => {
    console.log(error(result));
  });
}

function createClaim(creatorDid: ISovrinDidModel) {
  return function () {
    // Note: only projectDid is required. Other values (name, weight, claimid, ...) can be string/object/array/
    const msgCreateClaim = {
      name: 'doggy bag',
      weight: '2kg',
      claimId: "123",  // Note that this is not the actual claim ID that cellnode assigns to this claim
      claimTemplateId: "templateA",
      projectDid: projectDid
    };

    const signature = cryptoUtil.getSignatureForPayload(creatorDid, msgCreateClaim)
    ixo.claim.createClaim(msgCreateClaim, signature, CELLNODE_URL).then((response: any) => {
      console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
    }).catch((result: Error) => {
      console.log(error(result));
    });
  }
}

function listClaims(signerDid: ISovrinDidModel) {
  return function () {
    const listData = {projectDid: projectDid};

    const signature = cryptoUtil.getSignatureForPayload(signerDid, listData)
    ixo.claim.listClaimsForProject(listData, signature, CELLNODE_URL).then((response: any) => {
      console.log('Claim list for Project: ' + success(JSON.stringify(response, null, '\t')));
      expect(response.result).to.not.equal(null);
    }).catch((result: Error) => {
      console.log(error(result));
    });
  }
}

function listClaimsByTemplateId(signerDid: ISovrinDidModel) {
  return function () {
    const listData = {projectDid: projectDid, claimTemplateId: 'templateA'};

    const signature = cryptoUtil.getSignatureForPayload(signerDid, listData)
    ixo.claim.listClaimsForProjectByTemplateId(listData, signature, CELLNODE_URL).then((response: any) => {
      console.log('Claim list for Project: ' + success(JSON.stringify(response, null, '\t')));
      expect(response.result).to.not.equal(null);
    }).catch((result: Error) => {
      console.log(error(result));
    });
  }
}

function evaluateClaim() {
  // Note: only status and projectDid are required. Other values (name, weight, claimid, ...) can be string/object/array/
  const msgEvaluateClaim = {
    claimId: claimId,
    status: '1',
    projectDid: projectDid
  };

  const signature = cryptoUtil.getSignatureForPayload(evaluatorIxoDid, msgEvaluateClaim)
  ixo.claim.evaluateClaim(msgEvaluateClaim, signature, CELLNODE_URL).then((response: any) => {
    console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
  }).catch((result: Error) => {
    console.log(error(result));
  });
}

function withdrawFunds(userIxoDid: ISovrinDidModel, projectDid: string) {
  return function () {
    const msgWithdrawFunds = {
      senderDid: userIxoDid.did,
      data: {
        projectDid,
        recipientDid: userIxoDid.did,
        amount: "10000",
        isRefund: true,
      }
    }

    // Get signature data for did/AddDid
    ixo.utils.getSignData(msgWithdrawFunds, "project/WithdrawFunds", userIxoDid.verifyKey)
      .then((response: any) => {

        // If the response contains the signature bytes and the fee proceed
        if (response.sign_bytes && response.fee) {

          // Sign the signature bytes using the ixoDid and submit using registerUserDid
          const signature = cryptoUtil.getSignatureForSignBytes(userIxoDid, response.sign_bytes)
          ixo.project.withdrawFunds(msgWithdrawFunds, signature, response.fee)
            .then((response: any) => {

              // If the response does not contain any error code, then no error occurred and the withdraw went through
              if (!response.code) {
                return success()
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

const projectCreatorDid = ixoDid1;
const agent1IxoDid = ixoDid1;
const agent2IxoDid = ixoDid2;
const agent3IxoDid = ixoDid3;
const evaluatorIxoDid = ixoDid2;

describe('Demo', () => {

  it('should register DID 1', registerUserDid(ixoDid1))
  it('should register DID 2', registerUserDid(ixoDid2))
  it('should register DID 3', registerUserDid(ixoDid3))

  it('should create new project', createProject);

  it('should return list of projects and confirm that the project was created', projectCreated);

  // At this point, you should set the project DID constant to the created project's DID
  // This can be obtained by searching for the last project from the list of projects (above step)
  it('should expect that the project DID has been set', () => {
    if (projectDid.length == 0) {
      fail("project DID must be set to the DID of the created project")
    } else {
      ok("can proceed")
    }
  })

  it('should create agent 1', createAgent(agent1IxoDid, 'SA'));  // SA => claimer
  it('should approve agent 1', updateAgentStatusTo(agent1IxoDid, projectCreatorDid, 'SA')); // Only necessary if auto-approvals are off

  it('should create agent 2', createAgent(agent2IxoDid, 'EA'));  // EA => evaluator
  it('should approve agent 2', updateAgentStatusTo(agent2IxoDid, projectCreatorDid, 'EA')); // Only necessary if auto-approvals are off

  it('should create agent 3', createAgent(agent3IxoDid, 'SA'));  // SA => claimer
  it('should approve agent 3', updateAgentStatusTo(agent3IxoDid, projectCreatorDid, 'SA')); // Only necessary if auto-approvals are off

  it('should confirm that the agents were created', agentsCreatedAndApproved)

  it('should update project status to PENDING', updateProjectStatusTo("PENDING"));
  it('should return the project with status updated to PENDING', projectStatusUpdatedTo("PENDING"));

  // NOTE: at this point, the project address should be funded with enough tokens
  //
  //   - To get this address, run query: <blockchainUrl>:1317/projectAccounts/<projectDid>, where <blockchainUrl> is
  //     the IP (or equivalent) of the blockchain, and <projectDid> is the project's DID. The project address will be
  //     the value for which the key is equivalent to the project DID.
  //
  //     Example:
  //        If the response is:
  //          { ...
  //            "ValidatingNodeSetFees":          "ixo19uuhfqv4uee68fzjk2fm9hl2c85p7asmgxh8n3",
  //            "did:ixo:4XJLBfGtWSGKSz4BeRxdun": "ixo1wdcltsruc7r5xqvgyc9xakdaex238gvt3j4pjj",
  //            "did:ixo:6KtX69oXh8qumxdEx4W94i": "ixo1ta373wz94lqx5sjzzfjas6v0y5htvnr5mfyyak",
  //          ... }
  //        If the project DID is did:ixo:4XJLBfGtWSGKSz4BeRxdun, then the address is the second address.
  //
  //   - To get the token balance of the project address, run query: <blockchainUrl>:1317/auth/accounts/<projectAddr>
  //     and check the list of coins. If it is empty (i.e. []) then the project has a zero balance.
  //   - To check how many tokens you should send to the project address, run query: <blockchainUrl>:1317/projectParams
  //     and look for the project_minimum_initial_funding value, which will indicate the minimum funding in uixo tokens.

  it('should update project status to FUNDED', updateProjectStatusTo("FUNDED"));
  it('should return the project with status updated to FUNDED', projectStatusUpdatedTo("FUNDED"));

  it('should update project status to STARTED', updateProjectStatusTo("STARTED"));
  it('should return the project with status updated to STARTED', projectStatusUpdatedTo("STARTED"));

  // NB: if fees were set up for the project (by default no), the project should be appropriately funded for claims
  it('should create new claim', createClaim(agent1IxoDid));  // Create claim from agent 1
  it('should create new claim', createClaim(agent3IxoDid));  // Create claim from agent 3

  // NB: next, we list the claims, once without claim template ID filtering, and once with template ID filtering. We do
  // this from all three agents. Agents 1 and 3 [both SA agents] can only list claims that they created themselves. On
  // the other hand, agent 2 [EA agent] can list all claims created for the project.
  it('should list claims from agent 1', listClaims(agent1IxoDid));
  it('should list claims from agent 1 by template ID', listClaimsByTemplateId(agent1IxoDid));
  it('should list claims from agent 2', listClaims(agent2IxoDid));
  it('should list claims from agent 2 by template ID', listClaimsByTemplateId(agent2IxoDid));
  it('should list claims from agent 3', listClaims(agent3IxoDid));
  it('should list claims from agent 3 by template ID', listClaimsByTemplateId(agent3IxoDid));

  // At this point, you should set the claim ID constant to the created claim's ID
  // This can be obtained by searching for the last claim in the list of claims (above step)
  // N.B: the claim ID is actually the txHash value!
  it('should expect that the claim ID has been set', () => {
    if (claimId.length == 0) {
      fail("claim ID must be set to the ID of the created claim")
    } else {
      ok("can proceed")
    }
  })

  // NB: if fees were set up for the project (by default no), the project should be appropriately funded for evaluations
  it('should evaluate claim', evaluateClaim);

  it('should update project status to STOPPED', updateProjectStatusTo("STOPPED"));
  it('should return the project with status updated to STOPPED', projectStatusUpdatedTo("STOPPED"));

  it('should update project status to PAIDOUT', updateProjectStatusTo("PAIDOUT"));
  it('should return the project with status updated to PAIDOUT', projectStatusUpdatedTo("PAIDOUT"));

  // Withdraw funds from the project, as the owner
  // Note that if we had rewards set up for claims and evaluations, we would be able to withdraw funds as the agents
  it('should withdraw funds', withdrawFunds(projectCreatorDid, projectDid))
});
