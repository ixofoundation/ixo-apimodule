require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());
const PDSUrl = 'http://localhost:5000/';
const agentData = {
        email: 'don@ixo.com',
        name: 'Don',
        role: 'SA',
        agentDid: '1234'
    };
let agentUpdate = { agentDid: '1234', status: "APPROVED"}

describe('Agent functions', () => {

    it('should return agent template', () => {
        // ixo.agent.createAgent(agentData, 'create_agent', PDSUrl).then((response: any) => {
        //     console.log(response)
        //     // agentUpdate = { agentTx: response.result.tx, status: "Approved" }
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
        ixo.agent.listAgentsForProject(PDSUrl).then((response: any) => {
            console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });
    it('update agent status', () => {
        // ixo.agent.updateAgentStatus(agentUpdate, PDSUrl).then((response: any) => {
        //     console.log('Agent status update: ' + success(JSON.stringify(response, null, '\t')));
        //     expect(response.result).to.not.equal(null);
        // }).catch((result: Error) => {
        //     console.log(error(result));
        // });
    });
});