require('isomorphic-fetch');
import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { getWeb3Instance } from '../src/utils/authUtil';
import { MockProvider } from './common/util';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com', new MockProvider());
const sovrinDid = ixo.cryptoUtil.generateSovrinDID(ixo.cryptoUtil.generateMnemonic());

var projectData = {
    owner: {
        email: 'peter@noname.com',
        name: 'Peter Piper'
    },
    name: 'Reforestation',
    country: 'UK'
};

describe('Project functions', () => {
    it('should return project template', () => {
        ixo.project.getProjectTemplate('default').then((response: any) => {
            console.log('Project template: ' + success(JSON.stringify(response.result.template, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });

    it('should return list of projects', () => {
        ixo.project.listProjects().then((response: any) => {
            console.log('Project list: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });

    it('should return list of projects by did', () => {
        ixo.project.listProjectsByDid(ixo.credetialProvider.getDid()).then((response: any) => {
            console.log('Projects by did: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.not.equal(null);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });

    it('should create new project', () => {
        ixo.project.createProject(projectData, 'default').then((response: any) => {
            console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result.name).to.be.equal('Reforestation');
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});