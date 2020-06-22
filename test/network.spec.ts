import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL} from "../src/common/dummyData";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo(BLOCKSYNC_URL);

describe('Network functions', () => {

  it('should return explorer status', () => {
    ixo.network.pingIxoExplorer().then((response: any) => {
      console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
      expect(response).equals('API is running');
    }).catch((result: Error) => {
      console.log(error(result))
    });
  });
});
