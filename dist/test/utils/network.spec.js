"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../../src/utils/network");
var chai_1 = require("chai");
require("mocha");
var chalk = require('chalk');
var success = chalk.bold.green;
var error = chalk.bold.red;
var network = new network_1.Network();
describe('Network functions', function () {
    it('should return network status', function () {
        network.pingIxoServerNode('https://arcane-stream-64697.herokuapp.com/api/network').then(function (response) {
            console.log('Ping Results: ' + success(JSON.stringify(response, null, '\t')));
            chai_1.expect(response.result).equals('pong');
        }).catch(function (result) {
            console.log(error(result));
        });
    });
});
