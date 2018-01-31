import {expect} from 'chai';
import 'mocha';
import { Ixo } from '../index';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com');

var agentData = {
    email    : 'joe@bloggs.com',
    name     : 'Joe Blogs',
    role     : 'SA',
    projectTx: '58c7b58c15ede91e3504c5baab057e792e76814a2c7488fd385e732ad0508d19'
};

describe('Agent functions', () => {
    it('should return agent template', () => {
        ixo.agent.getAgentTemplate('default').then((response: any) => {
            console.log('Agent template: ' + success(JSON.stringify(response, null, '\t')));
            expect(response).to.be.an.instanceof(Object);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should create new agent', () => {
        ixo.agent.createAgent(agentData, '0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d', '0x98bc1b6a369d42bc36be05eb2890c0c0fd5df8f0239c44cc639af1f899c2cff501f04118981d8c00d461c0edd127bd1498ffd9f0198cc9fdd0888028b54985061b', new Date(), 'default').then((response: any) => {
            console.log('Create Agent: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.error.message).to.be.contain('invalid');
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});