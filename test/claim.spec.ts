import { Ixo } from '../index';
import { expect } from 'chai';
import { MockProvider } from './common/util';
import { signature } from '../dist/src/common/dummyData';
import { PDSUrl } from '../src/common/dummyData';
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo("http://35.192.187.110:46657", "https://ixo-block-sync.herokuapp.com");

let agentData;
let projectTx;
let claimData = { name: 'doggy bag', weight: '2kg', claimid: 123 };
let agentUpdate;
let evaluationData = { claimId: 123, status: 'evaulated'};
let listData = { projectDid: 'did:ixo:111' }

describe('Claim functions', () => {

    it('should create new claim', () => {
        ixo.claim.createClaim(claimData, signature, PDSUrl).then((response: any) => {
            console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.result.name).to.be.equal('Sipho');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should evaluate claim', () => {
        ixo.claim.evaluateClaim(evaluationData, signature, PDSUrl).then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('list all claims', () => {
        ixo.claim.listClaimsForProject(listData, signature, PDSUrl).then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

});