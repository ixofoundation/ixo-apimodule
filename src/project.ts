import { sendPostJSON } from './utils/http';
import { generateTxnId } from './common/util';

class Project {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getProjectTemplate(templateName: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'getTemplate',
            'params': {
                'name': templateName
            },
            'id': generateTxnId()
        });
    }

    listProjects(): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'list',
            'id': generateTxnId()
        });
    }

    listProjectsByDid(did: string): Promise<any> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'listForDID',
            'params': { 'did': did },
            'id': generateTxnId()
        });
    }

    createProject(did: string, signature: string, projectData: any, createdDate: Date, sigType?: string): Promise<any> {
        var signatureType = 'ECDSA';
        if (sigType) {
            signatureType = sigType
        }
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method': 'create',
            'id': generateTxnId(),
            'params': {
                'data': projectData,
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