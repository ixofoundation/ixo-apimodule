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
    
    // COMMENTED OUT CODE NEEDS TO BE REIMPLEMENTED WITH THE PROJECT DOC ONCE THE BLOCKCHAIN IS UP
    // getAgentTemplate(templateName: string): Promise<any> {
    //     const data = { 'name': templateName }
    //     return sendPostJSON(this.ixo.hostname + '/api/agent', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getTemplate', data));
    // }

    // listAgentsForDID(did: string): Promise<any> {
    //     const data = { 'did': did }
    //     return sendPostJSON(this.ixo.hostname + '/api/agent', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForDID', data));
    // }

    listAgentsForProject(did: string, projectTx: string): Promise<any> {
        const data = { role: 'SA' } //the data isn't required, by adding data, it filters results to return all that meet this condition 
        return sendPostJSON('http://192.168.1.125:5000/api/query', constructJsonRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', 'ListAgents', data));
    }

    createAgent(agentData: any, templateName: string): Promise<any> {

        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, 'create_agent').then((signature: Signature) => {
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', agentData, 'CreateAgent', "create_agent", signature);
            }).then((json: any) => {
                return resolve(sendPostJSON('http://192.168.1.125:5000/api/request', json));
            })
        });
    }

    updateAgentStatus(agentData: any): Promise<any> {

        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, 'update_agent_status').then((signature: Signature) => {
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', agentData, 'UpdateAgentStatus', "update_agent_status", signature);
            }).then((json: any) => {
                return resolve(sendPostJSON('http://192.168.1.125:5000/api/request', json));
            })
        });
    }
}

export default Agent;