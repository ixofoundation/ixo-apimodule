require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { IPingResult, Signature } from "../src/common/models";
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(new MockProvider());


describe('Network functions', () => {

    it('should return network status', () => {
        ixo.network.pingIxoServerNode().then((response: string) => {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            expect(response).equals('API is running');
        }).catch((result: Error) => {
            console.log(error(result))
        });

    });
});