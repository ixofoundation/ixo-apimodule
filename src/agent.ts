require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import * as Dummy from './common/dummyData';
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

    listAgentsForProject(PDSUrl: string, templateName:string, data?: any): Promise<any> {
        //the data isn't required, by adding data, it filters results to return all that meet this condition 
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(data, "listAgents").then((trueSig: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'listAgents', templateName, Dummy.signature, data);
        }).then((json: any) => {
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        })
        });
    }

    createAgent(agentData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, templateName).then((trueSig: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'createAgent', templateName, Dummy.signature, agentData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }

    updateAgentStatus(agentData: any, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, 'agent_status').then((trueSig: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'updateAgentStatus', "agent_status", Dummy.signature, agentData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }
}

export default Agent;