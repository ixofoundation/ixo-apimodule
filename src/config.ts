class Config {
	BLOCK_SYNC_URL: string;

	constructor(BLOCK_SYNC_URL: string) {
		this.BLOCK_SYNC_URL = BLOCK_SYNC_URL;
	}

	getBlockSyncUrl(): string {
		return this.BLOCK_SYNC_URL;
	}
}

export default Config;
