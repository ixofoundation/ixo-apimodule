import {expect} from 'chai';
import 'mocha';
import Ixo      from '../';

const chalk   = require('chalk');
const success = chalk.bold.green;
const error   = chalk.bold.red;
const ixo     = new Ixo('https://ixo-node.herokuapp.com');

describe('Project functions', () => {
    it('should return project template', () => {
        ixo.project.getProjectTemplate().then((response: any) => {
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
});