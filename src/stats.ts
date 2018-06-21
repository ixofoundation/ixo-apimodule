require('es6-promise');
import { sendPostJSON } from './utils/http';
import { constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
import { BLOCKCHAIN_URI } from './common/dummyData';

class Stats {
    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    getGolbalStats(): Promise<any> {
        return sendPostJSON(BLOCKCHAIN_URI + '/api/stats/', constructPublicJsonRequest('listStats'));
    }
}

export default Stats;
