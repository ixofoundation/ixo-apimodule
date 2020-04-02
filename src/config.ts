class Config {
  BLOCKCHAIN_NODE_URL: string;
  BLOCK_SYNC_URL: string;

  constructor(BLOCKCHAIN_NODE_URL: string, BLOCK_SYNC_URL: string) {
    this.BLOCKCHAIN_NODE_URL = BLOCKCHAIN_NODE_URL;
    this.BLOCK_SYNC_URL = BLOCK_SYNC_URL;
  }

  getBlockchainUrl(): string {
    return this.BLOCKCHAIN_NODE_URL;
  }

  getBlockSyncUrl(): string {
    return this.BLOCK_SYNC_URL;
  }
}

export default Config;
