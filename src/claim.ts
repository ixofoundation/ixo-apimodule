import { Ixo } from '../index';
import { sendPostJSON } from './utils/http';
import { constructJsonRequest, constructJsonSignRequest } from './common/util';
import * as Dummy from './common/dummyData';
import { Signature } from './common/models';

class Claim {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }
    createClaim(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('submitClaim', 'submit_claim', signature, data);
            return resolve(sendPostJSON(PDSUrl + 'api/request', json));
        })
    }

    evaluateClaim(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('evaluateClaim', 'evaluate_claim', signature, data);
			return resolve(sendPostJSON(PDSUrl + 'api/request', json));
		})
    }
	
    listClaimsForProject(signature: Signature, PDSUrl: string, data?: any): Promise<any> {
        return new Promise((resolve) => {

			const json = constructJsonSignRequest('listClaims', 'submit_claim', signature);
			return resolve(sendPostJSON(PDSUrl + 'api/request', json));
		})
    }

}

export default Claim;