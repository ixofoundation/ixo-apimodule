import {expect} from 'chai';
import 'mocha';
import {Ixo} from '../index';
import {BLOCKSYNC_URL} from "../src/common/dummyData";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo(BLOCKSYNC_URL);

describe('Stats functions', () => {
  it('should return global stats', () => {
    ixo.stats
      .getGlobalStats()
      .then((response: any) => {
        console.log('Global stats list: ' + success(JSON.stringify(response, null, '\t')));
        expect(response).to.not.equal(null);
      })
      .catch((result: Error) => {
        console.log(error(result));
      });
  });
});
