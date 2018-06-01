require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo();
const PDSUrl = 'http://localhost:5000/';
const agentData = {
        email: 'don@ixo.com',
        name: 'Don',
        role: 'SA',
        agentDid: '1234'
    };
let agentUpdate = { agentDid: '1234', status: "DECLINED", version: 2}

describe('Agent functions', () => {

	it('should create an agent', () => {
		ixo.agent.createAgent(agentData,'create_agent', PDSUrl).then((response: any) => {
			console.log(response)
			// agentUpdate = { agentTx: response.result.tx, status: "Approved" }
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});

	it('should list agents for project', () => {
		ixo.agent.listAgentsForProject(PDSUrl, 'create_agent').then((response: any) => {
			console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
			expect(response.result).to.not.equal(null);
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});
	
	it('update agent status', () => {
		ixo.agent.updateAgentStatus(agentUpdate, PDSUrl).then((response: any) => {
			console.log('Agent status update: ' + success(JSON.stringify(response, null, '\t')));
			expect(response.result).to.not.equal(null);
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});

});