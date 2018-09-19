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
let signature: Signature;
let didDoc: ISovrinDidModel;

describe('Project functions', () => {
	before(function() {
		didDoc = cryptoUtil.generateSovrinDID(cryptoUtil.generateMnemonic());
		signature = {
			type: 'ed25519-sha-256',
			created: new Date(),
			creator: 'did:sov:' + didDoc.did,
			publicKey: didDoc.encryptionPublicKey,
			signatureValue: new Buffer(cryptoUtil.getDocumentSignature(didDoc.secret.signKey, didDoc.verifyKey, JSON.stringify(projectData)))
				.slice(0, 64)
				.toString('hex')
				.toUpperCase()
		};
	});

	it('should create new project', () => {
		console.log(projectData);
		ixo.project
			.createProject(JSON.parse(JSON.stringify(projectData)), signature, PDSUrl)
			.then((response: any) => {
				console.log('Project create response: ' + success(JSON.stringify(response, null, '\t')));
				expect(response.result).to.not.equal(null);
			})
			.catch((result: Error) => {
				console.log(error(result));
			});
	});

	/* it('should return list of projects', () => {
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

	it('should return project with Did', () => {
		ixo.project
			.getProjectByProjectDid(projectDid)
			.then((response: any) => {
				console.log('Project: ' + success(JSON.stringify(response.result, null, '\t')));
				expect(response.result).to.not.equal(null);
			})
			.catch((result: Error) => {
				console.log(error(result));
			});
	}); */
});
