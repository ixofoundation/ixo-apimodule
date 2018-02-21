import { Ixo } from '../index';
import { sendPostJSON } from './utils/http';
import { constructJsonRequest, constructJsonSignRequest } from './common/util';
import { Signature } from './common/models';

class Claim {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    getClaimTemplate(templateName: string): Promise<any> {
        const data = { 'name': templateName }
        return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getTemplate', data));
    }

    getEvaluationTemplate(templateName: string): Promise<any> {
        const data = { 'name': templateName }
        return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getEvaluationTemplate', data));
    }
    
    listClaimsByProjectId(projectTx: string): Promise<any> {
        const data = { 'projectTx': projectTx }
        return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForProject', data));
    }

    listClaimsByDid(did: string): Promise<any> {
        const data = { 'did': did }
        return sendPostJSON(this.ixo.hostname + '/api/claim', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForDID', data));
    }

    createClaim(claimData: any, templateName: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(claimData, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(this.ixo.credentialProvider.getDid(), claimData, 'create', templateName, signature);
            }).then((json: any) => {
                return resolve(sendPostJSON(this.ixo.hostname + '/api/claim', json));
            })
        });
    }

    evaluateClaim(evaluationData: any, templateName: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(evaluationData, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(this.ixo.credentialProvider.getDid(), evaluationData, 'evaluateClaim', templateName, signature);
            }).then((json: any) => {
                return resolve(sendPostJSON(this.ixo.hostname + '/api/claim', json));
            })
        });
    }

}

export default Claim;