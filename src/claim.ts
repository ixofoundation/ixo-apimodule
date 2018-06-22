import { Ixo } from '../index';
import { sendPostJSON } from './utils/http';
import { constructJsonSignRequest } from './common/util';
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
	
    listClaimsForProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('listClaims', 'list_claim', signature, data);
			return resolve(sendPostJSON(PDSUrl + 'api/request', json));
		})
    }
}

export default Claim;