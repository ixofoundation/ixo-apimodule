require('es6-promise');
import Config from './config';
import { sendGetJSON } from './utils/http';
class Stats {
	config: Config;
	constructor(config: Config) {
		this.config = config;
	}

	getGlobalStats(): Promise<any> {
		return sendGetJSON(this.config.getBlockSyncUrl() + '/api/stats/listStats');
	}
}

export default Stats;
