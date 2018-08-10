require('es6-promise');
import { sendGetJSON } from './utils/http';
import { constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
class Stats {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	getGlobalStats(): Promise<any> {
		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/stats/listStats');
	}
}

export default Stats;
