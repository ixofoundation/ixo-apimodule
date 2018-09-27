import Config from './config';
class Network {
	config: Config;

	constructor(config: Config) {
		this.config = config;
	}

	pingIxoBlockchain(): Promise<any> {
		return fetch(this.config.getBlockchainUrl() + '/health')
			.then(function(response: any) {
				return response.text();
			})
			.catch(error => {
				return error;
			});
	}

	pingIxoExplorer(): Promise<any> {
		return fetch(this.config.getBlockSyncUrl())
			.then(function(response: any) {
				return response.text();
			})
			.catch(error => {
				return error;
			});
	}
}

export default Network;
