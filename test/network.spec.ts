import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo("http://localhost:46657", "http://localhost:8080");

describe('Network functions', () => {

  it('should return explorer status', () => {
    ixo.network.pingIxoExplorer().then((response: any) => {
      console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
      expect(response).equals('API is running');
    }).catch((result: Error) => {
      console.log(error(result))
    });
  });

  it('should return blockchain status', () => {
    ixo.network
      .pingIxoBlockchain()
      .then((response: string) => {
        console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).equals('{\n  "jsonrpc": "2.0",\n  "id": "",\n  "result": {}\n}');
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
});
