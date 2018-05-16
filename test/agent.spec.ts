require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());
const agentData = {
        email: 'donovan@ixo.com',
        name: 'Donovan',
        role: 'SA'
    };
let projectTx;
let agentUpdate;

describe('Agent functions', () => {
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

        return new Promise((resolve) => {
            // ixo.project.createProject(projectData, 'default').then((response: any) => {
            //     console.log(response);
            //     debugger;
            //     projectTx = response.result.tx;
            //     agentData = {
            //         email: 'joe@bloggs.com',
            //         name: 'Joe Blogs',
            //         role: 'SA',
            //         projectTx: response.result.tx
            //     };
                ixo.agent.createAgent(agentData, 'default').then((response: any) => {
                    console.log(response)
                    agentUpdate = { agentTx: response.result.tx, status: "Approved" }
                    resolve();
                }).catch((result: Error) => {
                    console.log(error(result));
                });

            // }).catch((result: Error) => {
            //     console.log(error(result));
            // });
        });
    // });

    // it('should return agent template', () => {
    //     ixo.agent.getAgentTemplate('default').then((response: any) => {
    //         console.log('Agent template: ' + success(JSON.stringify(response, null, '\t')));
    //         expect(response.result).to.not.equal(null);
    //     }).catch((result: Error) => {
    //         console.log(error(result));
    //     });

    // });
    // it('should list agent by did', () => {
    //     ixo.agent.listAgentsForDID(ixo.credentialProvider.getDid()).then((response: any) => {
    //         console.log('Agent list for DID: ' + success(JSON.stringify(response, null, '\t')));
    //         expect(response.result).to.not.equal(null);
    //     }).catch((result: Error) => {
    //         console.log(error(result));
    //     });

    // });
    it('should list agents for project', () => {
        ixo.agent.listAgentsForProject(ixo.credentialProvider.getDid(), projectTx).then((response: any) => {
            console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('update agent status', () => {
        ixo.agent.updateAgentStatus(agentUpdate).then((response: any) => {
            console.log('Agent status update: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});