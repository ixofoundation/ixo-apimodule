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

    // COMMENTED OUT CODE NEEDS TO BE REIMPLEMENTED WITH THE PROJECT DOC ONCE THE BLOCKCHAIN IS UP
    // getClaimTemplate(templateName: string): Promise<any> {
    //     const data = { 'name': templateName }
    //     return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getTemplate', data));
    // }

    // getEvaluationTemplate(templateName: string): Promise<any> {
    //     const data = { 'name': templateName }
    //     return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getEvaluationTemplate', data));
    // }
    
    // listClaimsByProjectId(projectTx: string): Promise<any> {
    //     const data = { 'projectTx': projectTx }
    //     return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForProject', data));
    // }

    // listClaimsByDid(did: string): Promise<any> {
    //     const data = { 'did': did }
    //     return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForDID', data));
    // }

    createClaim(claimData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(claimData, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'submitClaim', templateName, Dummy.signature, claimData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl + 'api/request', json));
            })
        });
    }

    evaluateClaim(evaluationData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(evaluationData, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'evaluateClaim', templateName, Dummy.signature, evaluationData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl + 'api/request', json));
            })
        });
    }

    listClaimsForProject(PDSUrl: string, templateName: string, data?: any): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(data, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'listClaims', templateName, Dummy.signature, data);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl + 'api/request', json));
            })
        });
    }

}

export default Claim;