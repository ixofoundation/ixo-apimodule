import { Ixo } from '../index';
class Network {
	ixo: Ixo;

	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	pingIxoBlockchain(): Promise<any> {
		return fetch(this.ixo.config.getBlockchainUrl + '/health')
			.then(function(response: any) {
				return response.text();
			})
			.catch(error => {
				return error;
			});
	}

	pingIxoExplorer(): Promise<any> {
		return fetch(this.ixo.config.getBlockSyncUrl())
			.then(function(response: any) {
				return response.text();
			})
			.catch(error => {
				return error;
			});
	}
}

export default Network;
