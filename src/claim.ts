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

    createClaim(claimData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.DID, 'submitClaim', Dummy.signature, claimData);
            return resolve(sendPostJSON(PDSUrl + 'api/request', json));
        })
    }

    evaluateClaim(evaluationData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.DID, 'evaluateClaim', Dummy.signature, evaluationData);
			return resolve(sendPostJSON(PDSUrl + 'api/request', json));
		})
    }

    listClaimsForProject(PDSUrl: string, templateName: string, data?: any): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.DID, 'listClaims', Dummy.signature, data);
			return resolve(sendPostJSON(PDSUrl + 'api/request', json));
		})
    }

}

export default Claim;