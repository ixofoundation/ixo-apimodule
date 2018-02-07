import { sendPostJSON } from './utils/http';
import { generateTxnId } from './common/util';

class Project {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getProjectTemplate(templateName: string, did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
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

    listProjects(did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'list',
            'id': generateTxnId(),
            'params': {
                'payload': {
                    'data': {},
                    'did': did
                }
            }
        });
    }

    listProjectsByDid(did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
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

    createProject(did: string, signature: string, projectData: any, createdDate: Date, templateName: string, sigType?: string): Promise<any> {
        var signatureType = 'ECDSA';
        if (sigType) {
            signatureType = sigType
        }
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'create',
            'id': generateTxnId(),
            'params': {
                'payload': {
                    'did': did,
                    'template': {
                        'name': templateName
                    },
                    'data': projectData
                },
                'signature': {
                    'type': signatureType,
                    'created': createdDate,
                    'creator': did,
                    'signature': signature
                }
            }
        });
    }
}

export default Project;