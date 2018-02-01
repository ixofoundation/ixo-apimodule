require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { IPingResult } from "../src/common/models";
import { Ixo } from '../index';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com');

describe('Network functions', () => {
    it('should return network status', () => {
        ixo.network.pingIxoServerNode().then((response: IPingResult) => {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).equals('pong');
        }).catch((result: Error) => {
            console.log(error(result))
        });

    });
});