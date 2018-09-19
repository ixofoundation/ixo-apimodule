require('es6-promise');
import { Signature } from './common/models';
import Config from './config';
import { sendGetJSON } from './utils/http';
class User {
	config: Config;
	constructor(config: Config) {
		this.config = config;
	}

	generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
		const signatureValue = [1, signature];
		return JSON.stringify({ payload: [10, didDoc], signature: { signatureValue, created } });
	}

	registerUserDid(data: any, signature: Signature): Promise<any> {
		const { signatureValue, created } = signature;
		const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
		const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

		return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
	}

	getDidDoc(did: string) {
		return sendGetJSON(this.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
	}
}

export default User;
