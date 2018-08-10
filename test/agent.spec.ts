import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { MockProvider } from './common/util';
import { signature, PDSUrl } from '../src/common/dummyData';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo("http://35.192.187.110:46657", "https://ixo-block-sync.herokuapp.com");
const agentData = {
        email: 'don@ixo.com',
        name: 'Don',
        role: 'SA',
		agentDid: '1234',
		projectDid: 'did:ixo:111'
    };
let agentUpdate = { agentDid: 'did:sov:111', status: "DECLINED", version: 1, projectDid: 'did:ixo:111'}
let listData = { projectDid: 'did:ixo:111' }
describe('Agent functions', () => {

	it('should create an agent', () => {
		ixo.agent.createAgent(agentData, signature, PDSUrl).then((response: any) => {
			console.log(response)
			// agentUpdate = { agentTx: response.result.tx, status: "Approved" }
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});

	it('should list agents for project', () => {
		ixo.agent.listAgentsForProject(listData, signature, PDSUrl).then((response: any) => {
			console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
			expect(response.result).to.not.equal(null);
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});
	
	it('update agent status', () => {
		ixo.agent.updateAgentStatus(agentData, signature, PDSUrl).then((response: any) => {
			console.log('Agent status update: ' + success(JSON.stringify(response, null, '\t')));
			expect(response.result).to.not.equal(null);
		}).catch((result: Error) => {
			console.log(error(result));
		});
	});

});