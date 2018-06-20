import { expect } from 'chai';
import 'mocha';
import { Signature } from "../src/common/models";
import { Ixo } from '../index';
import { MockProvider } from './common/util';
import { signature } from '../src/common/dummyData';


const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const ixo = new Ixo();

const didDoc = {
    didDoc:
    {
        did: "did:sov:2p19P17cr6XavfMJ8htYSS",
        pubKey: "zELURQSNzeSHVLmE6JYzQRN5G6L2evtdYw89RBimXWH"
    }
}

describe('User functions', () => {

    it('should register user did', () => {
        ixo.user.registerUserDid(didDoc, signature).then((response: string) => {
            console.log('User DID registration response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result))
        });
    });
});