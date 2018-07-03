require('es6-promise');
import { sendPostJSON } from './utils/http';
import { constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
class Stats {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	getGolbalStats(): Promise<any> {
		return sendPostJSON(this.ixo.config.getBlockSyncUrl() + '/api/stats/', constructPublicJsonRequest('listStats'));
	}
}

export default Stats;
