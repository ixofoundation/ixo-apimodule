class Config {
	BLOCKCHAIN_IP: string;
	BLOCK_SYNC_URL: string;

	constructor(BLOCKCHAIN_IP: string, BLOCK_SYNC_URL: string) {
		this.BLOCKCHAIN_IP = BLOCKCHAIN_IP;
		this.BLOCK_SYNC_URL = BLOCK_SYNC_URL;
	}

	getBlockchainUrl(): string {
		return 'http://' + this.BLOCKCHAIN_IP + ':46657';
	}

	getBlockchainRestUrl(): string {
		return 'http://' + this.BLOCKCHAIN_IP + ':1317';
	}

	getBlockSyncUrl(): string {
		return this.BLOCK_SYNC_URL;
	}
}

export default Config;
