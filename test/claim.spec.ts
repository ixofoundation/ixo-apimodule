require('isomorphic-fetch');
import { Ixo } from '../index';
import { expect } from 'chai';
import { MockProvider } from './common/util';
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());

let agentData;
let projectTx;
let claimData;
let agentUpdate;
let evaluationData;

describe('Claim functions', () => {
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
                //register service agent
                ixo.agent.createAgent(agentData, 'default').then((response: any) => {
                    agentUpdate = { agentTx: response.result.tx, status: "Approved" }
                });
                ixo.agent.updateAgentStatus(agentUpdate).then((response: any) => {
                    claimData = {
                        name: "Sipho",
                        attended: true,
                        projectTx: projectTx
                    }
                    resolve();
                })
            }).catch((result: Error) => {
                console.log(error(result));
            });
        });
    });

    it('should return claim template', () => {
        ixo.claim.getClaimTemplate('default').then((response: any) => {
            console.log('Claim template: ' + success(JSON.stringify(response.result.template, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should return evaluation template', () => {
        ixo.claim.getEvaluationTemplate('default').then((response: any) => {
            console.log('Evaluation template: ' + success(JSON.stringify(response.result.template, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should create new claim', (done) => {
        ixo.claim.createClaim(claimData, 'default').then((response: any) => {
            console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result.name).to.be.equal('Sipho');

            evaluationData = {
                claimTx: response.result.tx,
                result: 'Approved'
            };
            done();
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });

    it('should list claims by project Id', () => {
        ixo.claim.listClaimsByProjectId(projectTx).then((response: any) => {
            console.log('Claim list for project: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should list claims by did', () => {
        ixo.claim.listClaimsByDid(ixo.credentialProvider.getDid()).then((response: any) => {
            console.log('Claim list for did: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should evaluate claim', () => {
        ixo.claim.evaluateClaim(evaluationData, 'default').then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});