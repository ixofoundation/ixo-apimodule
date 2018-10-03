require('es6-promise');
import { Ixo } from '../index';
import { Signature } from './common/models';
import { sendGetJSON } from './utils/http';
class User {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
		return JSON.stringify({ payload: [{type: "did/AddDid", value:didDoc}], signatures: [{ signature: signature, created: created }] });
	};

	registerUserDid(data: any, signature: Signature): Promise<any> {
		const { signatureValue, created } = signature;
		const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created);
		const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/blockchain/0x' + ledgerObjectUppercaseHex);
	}

	getDidDoc(did: string) {
		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/did/getByDid/' + did);
	}
}

export default User;
