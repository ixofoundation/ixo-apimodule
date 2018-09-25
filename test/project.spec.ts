import { expect } from 'chai';
import 'mocha';
import { Ixo } from '../index';
import { projectData, PDSUrl, BLOCKCHAIN_URI_TENDERMINT, BLOCKCHAIN_URI } from '../src/common/dummyData';
import CryptoUtil from './util/cryptoUtil';
import { ISovrinDidModel, Signature } from '../src/common/models';

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const ixo = new Ixo(BLOCKCHAIN_URI_TENDERMINT, BLOCKCHAIN_URI);
let cryptoUtil = new CryptoUtil();
let didDoc: ISovrinDidModel;

describe('Project functions', () => {
	before(function(done) {
		didDoc = cryptoUtil.generateSovrinDID(cryptoUtil.generateMnemonic());
		let didPayload = {
			didDoc: {
				did: 'did:sov:' + didDoc.did,
				pubKey: didDoc.verifyKey,
				credentials: []
			}
		};
		ixo.user.registerUserDid(didPayload, cryptoUtil.getSignatureForPayload(didDoc, didPayload)).then((response: any) => {
			if (JSON.stringify(response).includes('hash')) {
				setTimeout(function() {
					ixo.user.getDidDoc(didPayload.didDoc.did).then((response: any) => {
						console.log('RESPONSE DID: ' + JSON.stringify(response));
						return done();
					});
				}, 1000);
			}
		});
	});

	it('should create new project', () => {
		ixo.project
			.createProject(JSON.parse(JSON.stringify(projectData)), cryptoUtil.getSignatureForPayload(didDoc, projectData), PDSUrl)
			.then((response: any) => {
				console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
				expect(response.result).to.not.equal(null);
			})
			.catch((result: Error) => {
				console.log(error(result));
			});
	});

	it('should return list of projects', () => {
		ixo.project
			.listProjects()
			.then((response: any) => {
				console.log('Project list: ' + success(JSON.stringify(response, null, '\t')));
				expect(response).to.not.equal(null);
			})
			.catch((result: Error) => {
				console.log(error(result));
			});
	});

	/* it('should return project with Did', () => {
		ixo.project
			.getProjectByProjectDid(projectDid)
			.then((response: any) => {
				console.log('Project: ' + success(JSON.stringify(response.result, null, '\t')));
				expect(response.result).to.not.equal(null);
			})
			.catch((result: Error) => {
				console.log(error(result));
			});
	});  */
});
