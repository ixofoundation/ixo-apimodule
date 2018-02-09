require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { IPingResult, Signature } from "../src/common/models";
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());

var projectData = {
    owner: {
        email: 'peter@noname.com',
        name: 'Peter Piper'
    },
    name: 'Reforestation',
    country: 'UK'
};

describe('Network functions', () => {

    it('should return network status', () => {


        ixo.credetialProvider.sign(projectData).then((resp: Signature) => {
            console.log(JSON.stringify(resp.signature));

        }).catch((result: Error) => {
            console.log(error(result))
        });
        // ixo.network.pingIxoServerNode().then((response: IPingResult) => {
        //     console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
        //     expect(response.result).equals('pong');
        // }).catch((result: Error) => {
        //     console.log(error(result))
        // });

    });
});