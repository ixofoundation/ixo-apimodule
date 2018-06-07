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
	
    createAgent(agentData: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('createAgent', 'create_agent', signature, agentData);
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
	}
	
    listAgentsForProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        //the data can be filtered by adding/removing from payload, it filters results to return all that meet this condition 
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('listAgents', 'create_agent', signature, data);
            return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }

    updateAgentStatus(agentData: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('updateAgentStatus', "agent_status", signature, agentData);
			return resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }
}

export default Agent;