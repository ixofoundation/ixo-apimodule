require('es6-promise');
import { Signature } from './common/models';
import { constructJsonSignRequest } from './common/util';
import { sendPostJSON } from './utils/http';

class Agent {
	createAgent(agentData: any, signature: Signature, PDSUrl: string): Promise<any> {
		const json = constructJsonSignRequest('createAgent', 'create_agent', signature, agentData);
		return sendPostJSON(PDSUrl + 'api/request', json);
	}

	listAgentsForProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
		const json = constructJsonSignRequest('listAgents', 'list_agent', signature, data);
		return sendPostJSON(PDSUrl + 'api/request', json);
	}

	updateAgentStatus(agentData: any, signature: Signature, PDSUrl: string): Promise<any> {
		const json = constructJsonSignRequest('updateAgentStatus', 'agent_status', signature, agentData);
		return sendPostJSON(PDSUrl + 'api/request', json);
	}
}

export default Agent;
