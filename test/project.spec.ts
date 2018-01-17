import {expect} from 'chai';
import 'mocha';
import Ixo from "../";

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo('https://ixo-node.herokuapp.com');

describe('Project functions', () => {
    it('should return project template', () => {
        ixo.project.getProjectTemplate().then((response: any) => {
            console.log('Project template: ' + success(JSON.stringify(response.result.template, null, '\t')));
            expect(response.result.template).to.be.an.instanceof(Object);
        }).catch((result: Error) => {
            console.log(error(result))
        });

    });
});