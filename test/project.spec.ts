import {expect} from 'chai';
import 'mocha';
import { Ixo } from '../index';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com');

var projectData = {
    owner  : {
        email: 'peter@noname.com',
        name : 'Peter Piper'
    },
    name   : 'Reforestation',
    country: 'UK'
};

describe('Project functions', () => {
    it('should return project template', () => {
        ixo.project.getProjectTemplate('default').then((response: any) => {
            console.log('Project template: ' + success(JSON.stringify(response.result.template, null, '\t')));
            expect(response.result.template).to.be.an.instanceof(Object);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should return list of projects', () => {
        ixo.project.listProjects().then((response: any) => {
            console.log('Project list: ' + success(JSON.stringify(response.result, null, '\t')));
            expect(response.result).to.be.an.instanceof(Object);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should return list of projects by did', () => {
        ixo.project.listProjectsByDid('0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d').then((response: any) => {
            console.log('Projects by did: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result).to.be.an.instanceof(Object);
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
    it('should create new project', () => {
        ixo.project.createProject('0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d', '0x6d1a512a1235acc8e1af7af075b38513b92bb8793dc43e705898f35b08fdbfc87f6b12e8c4e7a3cc08045bbd18eafbb5b6393c05ba76498131904af43f204aa21b', projectData, new Date()).then((response: any) => {
            console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
            expect(response.result.name).to.be.equal('Reforestation');
        }).catch((result: Error) => {
            console.log(error(result));
        });

    });
});