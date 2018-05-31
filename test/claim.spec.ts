require('isomorphic-fetch');
import { Ixo } from '../index';
import { expect } from 'chai';
import { MockProvider } from './common/util';
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo();
const PDSUrl = 'http://localhost:5000/';

let agentData;
let projectTx;
let claimData = { name: 'doggy bag', weight: '2kg', claimid: 123 };
let agentUpdate;
let evaluationData = { claimId: 123, status: 'evaulated'};

describe('Claim functions', () => {

    it('should create new claim', () => {
        ixo.claim.createClaim(claimData, 'submit_claim', PDSUrl).then((response: any) => {
            console.log('Claim create response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.result.name).to.be.equal('Sipho');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should evaluate claim', () => {
        ixo.claim.evaluateClaim(evaluationData, 'evaluate_claim', PDSUrl).then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('list all claims', () => {
        ixo.claim.listClaimsForProject(PDSUrl, 'submit_claim').then((response: any) => {
            console.log('Claim evaluate response: ' + success(JSON.stringify(response, null, '\t')));
            // expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

});