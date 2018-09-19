import { Ixo } from '../index';
class Web3Proxy {

	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	pingIxoBlockchain(): Promise<any> {
		return fetch(this.ixo.config.getBlockchainUrl() + '/health')
			.then(function(response: any) {
				return response.text();
			})
			.catch(error => {
				return error;
			});
	}
}

export default Web3Proxy;
