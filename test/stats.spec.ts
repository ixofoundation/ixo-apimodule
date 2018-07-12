import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo("35.192.187.110", "https://ixo-block-sync.herokuapp.com");

describe('Stats functions', () => {
    it('should return global stats', () => {
        ixo.stats.getGlobalStats().then((response: any) => {
            console.log('Global stats list: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
	});
});

