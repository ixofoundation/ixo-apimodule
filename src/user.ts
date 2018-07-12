require('es6-promise');
import { Ixo } from '../index';
import { Signature } from './common/models';
import { sendPostJSON } from './utils/http';
import { constructPublicJsonRequest } from './common/util';
class User {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
		const signatureValue = [1, signature];
		return JSON.stringify({ payload: [10, didDoc], signature: { signatureValue, created } });
	}

	registerUserDid(data: any, signature: Signature): Promise<any> {
		const { signatureValue, created } = signature;
		const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
		const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

		return fetch(this.ixo.config.getBlockchainUrl() + '/broadcast_tx_sync?tx=0x' + ledgerObjectUppercaseHex)
			.then(function(response: any) {
				return response;
			})
			.catch(error => {
				return error;
			});
	}

	getDidDoc(did: string) {
		const payload = { did: did };
		return sendPostJSON(this.ixo.config.getBlockSyncUrl() + '/api/did/', constructPublicJsonRequest('getDidDocByDid', payload));
	}
}

export default User;
