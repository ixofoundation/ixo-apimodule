require('es6-promise');
import { Ixo } from '../index';
import { Signature } from './common/models';
import { sendPostJSON, sendGetJSON } from './utils/http';
import { constructPublicJsonRequest } from './common/util';
class User {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
		const signatureValue = [1, signature];

		const didDocJson = JSON.stringify(didDoc);
		// const didDocHex = new Buffer(didDocJson).toString("hex").toUpperCase()
			
		return JSON.stringify({ payload: [10, didDocJson], signature: { signatureValue, created } });
	};

	registerUserDid(data: any, signature: Signature): Promise<any> {
		const { signatureValue, created } = signature;
		const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
		const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
		// return fetch(this.ixo.config.getBlockchainUrl() + '/broadcast_tx_sync?tx=0x' + ledgerObjectUppercaseHex)
		// 	.then(function(response: any) {
		// 		return response;
		// 	})
		// 	.catch(error => {
		// 		return error;
		// 	});
	}

	getDidDoc(did: string) {
		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
	}
}

export default User;
