require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';

const signature = {  
    type:"ECDSA",
    created: new Date(),
    creator: "did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f",
    publicKey: "0x279291ddf089c0e07c237fa70d86691432c0441c",
    signature: "0x0dacb44285cbf3b3c96301283b63720255f4e9bf810d649aa318c4bd0ec1e3515146e44a5c3d7c6c5ecb0834578a6cf1b67c5498c1b361769f61a968631d32e800"
 }

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

    listAgentsForProject(PDSUrl: string, data?: any): Promise<any> {
        //the data isn't required, by adding data, it filters results to return all that meet this condition 
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(data, "listAgents").then((trueSig: Signature) => {
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', 'listAgents', "create_agent", signature, data);
        }).then((json: any) => {
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        })
        });
    }

    createAgent(agentData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, templateName).then((trueSig: Signature) => {
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', 'createAgent', templateName, signature, agentData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }

    updateAgentStatus(agentData: any, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(agentData, 'agent_status').then((trueSig: Signature) => {
                console.log("SIG: "+JSON.stringify(signature));
                return;
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', 'updateAgentStatus', "agent_status", signature, agentData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }
}

export default Agent;