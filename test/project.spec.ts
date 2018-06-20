import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { getWeb3Instance } from '../src/utils/authUtil';
import { signature, projectData, PDSUrl } from '../src/common/dummyData';
import CryptoUtil from './util/cryptoUtil';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo();
let cryptoUtil = new CryptoUtil();

const sovrinDid = cryptoUtil.generateSovrinDID(cryptoUtil.generateMnemonic());
const projectDid = "did:ixo:9pJ4ChrvkaoP6C2dHJNXRK";
describe('Project functions', () => {

    it('should return list of projects', () => {
        ixo.project.listProjects().then((response: any) => {
            console.log('Project list: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
	});
	
	it('should return project with Did', () => {
        ixo.project.getProjectByDid(projectDid).then((response: any) => {
            console.log('Project: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

    it('should create new project', () => {
        ixo.project.createProject(projectData, signature, PDSUrl).then((response: any) => {
            console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });
    });

});

