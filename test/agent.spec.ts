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

describe('Agent functions', () => {
    before(() => {
        var projectData = {
            owner: {
                email: 'peter@noname.com',
                name: 'Unit Tester'
            },
            name: 'IXO-Test',
            country: 'UK'
        };

        return new Promise((resolve) => {
            ixo.project.createProject(projectData, 'default').then((response: any) => {
                agentData = {
                    email: 'joe@bloggs.com',
                    name: 'Joe Blogs',
                    role: 'SA',
                    projectTx: response.result.tx
                };
                resolve();
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
    it('should create new agent', () => {
        ixo.agent.createAgent(agentData, 'default').then((response: any) => {
            console.log('Create Agent: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result.email).to.be.equal('joe@bloggs.com');
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should list agent by did', () => {
        ixo.agent.listAgentsForDID(ixo.credetialProvider.getDid()).then((response: any) => {
            console.log('Agent list for DID: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});