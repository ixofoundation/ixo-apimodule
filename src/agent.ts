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

    listAgentsForProject(PDSUrl: string, templateName:string, data?: any): Promise<any> {
        //the data isn't required, by adding data, it filters results to return all that meet this condition 
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.signature.creator, 'listAgents', 'create_agent', Dummy.signature, data);
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }

    createAgent(agentData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.signature.creator, 'createAgent', 'create_agent', Dummy.signature, agentData);
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }

    updateAgentStatus(agentData: any, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(Dummy.DID, 'updateAgentStatus', "agent_status", Dummy.signature, agentData);
			return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }
}

export default Agent;