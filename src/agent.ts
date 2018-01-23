import {sendPostJSON}  from './utils/http';
import {generateTxnId} from './common/util';

class Agent {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getAgentTemplate(templateName: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method' : 'getTemplate',
            'params' : {
                'name': templateName
            },
            'id'     : generateTxnId()
        });
    }

    createAgent(agentData: any, did: string, signature: string, createdDate: Date, templateName: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method' : 'create',
            'id'     : generateTxnId(),
            'params' : {
                'template' : {
                    'name': templateName
                },
                'data'     : agentData,
                'signature': {
                    'type'     : 'ECDSA',
                    'created'  : createdDate,
                    'creator'  : did,
                    'signature': signature
                }
            }
        });
    }

}

export default Agent;