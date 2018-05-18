require('isomorphic-fetch');
import { Ixo } from '../index';
import { expect } from 'chai';
import { MockProvider } from './common/util';
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo(new MockProvider());
const PDSUrl = 'http://localhost:5000/';

let agentData;
let projectTx;
let claimData = { name: 'doggy bag', weight: '2kg', claimid: 123 };
let agentUpdate;
let evaluationData = { claimId: 123, status: 'evaulated'};

describe('Claim functions', () => {
    // before(() => {
        // var projectData = {
        //     Title: "Clifton Beach Clean Up",
        //     Owner: "Donny",
        //     ShortDescription: "Clean up of Clifton Beach after New Years Eve Party",
        //     LongDescription: "Rubbish has been left everywhere after the last party of 2017. The people did their damage and had fun, now it's time to fix up the mess",
        //     ImpactAction: "New Year beach cleanup",
        //     Country: "South Africa",
        //     Sdgs: ["15.2","12","10.1"],
        //     ImpactsRequired: 100,
        //     ClaimTemplate: "beach_claims",
        //     SocialMedia:{ 
        //         FacebookLink: "exampleFBURL",
        //         InstagramLink: "exampleInstaURL",
        //         TwitterLink: "exampleTwitterURL"
        //     },
        //     Image: "test.png",
        //     autoApproveInvestmentAgent: true,
        //     autoApproveServiceAgent: false,
        //     autoApproveEvaluationAgent: true
        // };

        // return new Promise((resolve) => {
            // ixo.project.createProject(projectData, 'default').then((response: any) => {
            //     projectTx = response.result.tx;
            //     agentData = {
            //         email: 'joe@bloggs.com',
            //         name: 'Joe Blogs',
            //         role: 'SA',
            //         projectTx: response.result.tx
            //     };
            //     //register service agent
            //     ixo.agent.createAgent(agentData, 'default').then((response: any) => {
            //         agentUpdate = { agentTx: response.result.tx, status: "Approved" }
            //     });
            //     ixo.agent.updateAgentStatus(agentUpdate).then((response: any) => {
            //         claimData = {
            //             name: "Sipho",
            //             attended: true,
            //             projectTx: projectTx
            //         }
            //         resolve();
            //     })
            // }).catch((result: Error) => {
            //     console.log(error(result));
            // });
            // it('should create new project', () => {
            //     ixo.project.createProject(projectData, 'create_project', PDSUrl).then((response: any) => {
            //         console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
            //         expect(response.result.Title).to.be.equal('Clifton Beach Clean Up');
            //         resolve();
            //     }).catch((result: Error) => {
            //         console.log(error(result));
            //     });
            // });
            // ******************************************** //
            //TODO -> for claims, must create project, then create agent, then create claim
            // ******************************************** //
        // });
    // });

    it('should return claim template', () => {
        // ixo.claim.getClaimTemplate('default').then((response: any) => {
        //     console.log('Claim template: ' + success(JSON.stringify(response.result.template, null, '\t')));
        //     expect(response.result).to.not.equal(null);
        // }).catch((result: Error) => {
        //     console.log(error(result));
        // });
    });

    // it('should return evaluation template', () => {
    //     // ixo.claim.getEvaluationTemplate('default').then((response: any) => {
    //     //     console.log('Evaluation template: ' + success(JSON.stringify(response.result.template, null, '\t')));
    //     //     expect(response.result).to.not.equal(null);
    //     // }).catch((result: Error) => {
    //     //     console.log(error(result));
    //     // });
    // });

    it('should create new claim', () => {
        // ixo.claim.createClaim(claimData, 'submit_claim', PDSUrl).then((response: any) => {
        //     console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
        //     // expect(response.result.name).to.be.equal('Sipho');
        // }).catch((result: Error) => {
        //     console.log(error(result));
        // });
    });


    // it('should list claims by did', () => {
    //     // ixo.claim.listClaimsByDid(ixo.credentialProvider.getDid()).then((response: any) => {
    //     //     console.log('Claim list for did: ' + success(JSON.stringify(response, null, '\t')));
    //     //     expect(response.result).to.not.equal(null);
    //     // }).catch((result: Error) => {
    //     //     console.log(error(result));
    //     // });
    // });

    it('should evaluate claim', () => {
        // ixo.claim.evaluateClaim(evaluationData, 'evaluate_claim', PDSUrl).then((response: any) => {
        //     console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
        //     expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        // }).catch((result: Error) => {
        //     console.log(error(result));
        // });
    });

    it('list all claims', () => {
        ixo.claim.listClaimsForProject(PDSUrl, 'submit_claim').then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

});