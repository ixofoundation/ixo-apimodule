import { expect } from 'chai';
import 'mocha';
import { Signature } from "../src/common/models";
import { Ixo } from '../index';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo("http://35.192.187.110", "https://ixo-block-sync.herokuapp.com");

describe('Network functions', () => {

    it('should return explorer status', () => {
        ixo.network.pingIxoExplorer().then((response: string) => {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            expect(response).equals('API is running');
        }).catch((result: Error) => {
            console.log(error(result))
        });
    });

    it('should return blockchain status', () => {
        ixo.network.pingIxoBlockchain().then((response: string) => {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            expect(response).equals("{\n  \"jsonrpc\": \"2.0\",\n  \"id\": \"\",\n  \"result\": {}\n}");
        }).catch((result: Error) => {
            console.log(error(result))
        });
    });
});