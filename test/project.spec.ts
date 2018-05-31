require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { getWeb3Instance } from '../src/utils/authUtil';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo();
const sovrinDid = ixo.cryptoUtil.generateSovrinDID(ixo.cryptoUtil.generateMnemonic());
const PDSUrl = 'http://localhost:5000/';

var projectData = {
    Title: "Clifton Beach Clean Up",
    Owner: "Donny",
    ShortDescription: "Clean up of Clifton Beach after New Years Eve Party",
    LongDescription: "Rubbish has been left everywhere after the last party of 2017. The people did their damage and had fun, now it's time to fix up the mess",
    ImpactAction: "New Year beach cleanup",
    Country: "South Africa",
    Sdgs: ["15.2","12","10.1"],
    ImpactsRequired: 100,
    ClaimTemplate: "beach_claims",
    SocialMedia:{ 
        FacebookLink: "exampleFBURL",
        InstagramLink: "exampleInstaURL",
        TwitterLink: "exampleTwitterURL"
    },
    Image: "test.png",
    autoApproveInvestmentAgent: true,
    autoApproveServiceAgent: false,
    autoApproveEvaluationAgent: true
};

describe('Project functions', () => {

    it('should return list of projects', () => {
        ixo.project.listProjects().then((response: any) => {
            console.log('Project list: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    // it('should create new project', () => {
    //     ixo.project.createProject(projectData,'testSig', PDSUrl).then((response: any) => {
    //         console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
    //         expect(response.result.Title).to.be.equal('Clifton Beach Clean Up');
    //     }).catch((result: Error) => {
    //         console.log(error(result));
    //     });
    // });

});

