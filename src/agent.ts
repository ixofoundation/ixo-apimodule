import { sendPostJSON } from './utils/http';
import { generateTxnId } from './common/util';

class Agent {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getAgentTemplate(templateName: string, did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method': 'getTemplate',
            'params': {
                'payload': {
                    'did': did,
                    'data': {
                        'name': templateName
                    }
                }
            },
            'id': generateTxnId()
        });
    }

    createAgent(agentData: any, did: string, signature: string, createdDate: Date, templateName: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method': 'create',
            'id': generateTxnId(),
            'params': {
                'payload': {
                    'template': {
                        'name': templateName
                    },
                    'data': agentData,
                    'did': did
                },
                'signature': {
                    'type': 'ECDSA',
                    'created': createdDate,
                    'creator': did,
                    'signature': signature
                }
            }
        });
    }

    listAgentsForDID(did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method': 'listForDID',
            'params': {
                'payload': {
                    'did': did,
                    'data': {
                        'did': did
                    }
                }
            },
            'id': generateTxnId()
        });
    }

    listAgentsForProject(did: string, projectTx: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/agent', {
            'jsonrpc': '2.0',
            'method': 'listForProject',
            'params': {
                'payload': {
                    'did': did,
                    'data': {
                        'projectTx': projectTx
                    }
                }
            },
            'id': generateTxnId()
        });
    }
}

export default Agent;