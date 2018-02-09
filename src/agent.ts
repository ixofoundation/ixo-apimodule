require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';

class Agent {
    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    getAgentTemplate(templateName: string): Promise<any> {
        const data = { 'name': templateName }
        return sendPostJSON(this.ixo.hostname + '/api/agent', constructJsonRequest(this.ixo.credetialProvider.getDid(), 'getTemplate', data));
    }

    listAgentsForDID(did: string): Promise<any> {
        const data = { 'did': did }
        return sendPostJSON(this.ixo.hostname + '/api/agent', constructJsonRequest(this.ixo.credetialProvider.getDid(), 'listForDID', data));
    }

    listAgentsForProject(did: string, projectTx: string): Promise<any> {
        const data = { 'projectTx': projectTx }
        return sendPostJSON(this.ixo.hostname + '/api/agent', constructJsonRequest(this.ixo.credetialProvider.getDid(), 'listForProject', data));
    }

    createAgent(agentData: any, templateName: string): Promise<any> {
        return this.ixo.credetialProvider.sign(agentData, templateName).then((signature: Signature) => {
            return constructJsonSignRequest(this.ixo.credetialProvider.getDid(), agentData, 'create', templateName, signature);
        }).then((json: any) => {
            return sendPostJSON(this.ixo.hostname + '/api/agent', json);
        })
    }
}

export default Agent;