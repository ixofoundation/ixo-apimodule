require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());
let agentData;
let projectTx;
let agentUpdate;

describe('Agent functions', () => {
    before(() => {
        var projectData = {
            owner: {
                email: 'peter@noname.com',
                name: 'Peter Piper'
            },
            name: 'Reforestation',
            country: 'UK',
            about: "A project",
            agentTemplate: {
                name: "default"
            },
            claimTemplate: {
                name: "default"
            },
            evaluationTemplate: {
                name: "default"
            },
            numberOfSuccessfulClaims: 10,
            autoApproveInvestmentAgent: true,
            autoApproveServiceAgent: true,
            autoApproveEvaluationAgent: true
        };

        return new Promise((resolve) => {
            ixo.project.createProject(projectData, 'default').then((response: any) => {
                projectTx = response.result.tx;
                agentData = {
                    email: 'joe@bloggs.com',
                    name: 'Joe Blogs',
                    role: 'SA',
                    projectTx: response.result.tx
                };
                ixo.agent.createAgent(agentData, 'default').then((response: any) => {
                    console.log(response)
                    agentUpdate = { agentTx: response.result.tx, status: "Approved" }
                    resolve();
                })

            }).catch((result: Error) => {
                console.log(error(result));
            });
        });
    });

    it('should return agent template', () => {
        ixo.agent.getAgentTemplate('default').then((response: any) => {
            console.log('Agent template: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should list agent by did', () => {
        ixo.agent.listAgentsForDID(ixo.credentialProvider.getDid()).then((response: any) => {
            console.log('Agent list for DID: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
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