import {Network} from '../../src/network';
import {expect} from 'chai';
import 'mocha';
import {IPingResult} from "../../src/models";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const network = new Network();


describe('Network functions', () => {

    it('should return network status', () => {
        network.pingIxoServerNode('https://arcane-stream-64697.herokuapp.com/api/network').then((response: IPingResult) => {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).equals('pong');
        }).catch((result: Error) => {
            console.log(error(result))
        });

    });


});