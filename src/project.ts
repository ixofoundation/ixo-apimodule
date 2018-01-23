import {sendPostJSON}  from './utils/http';
import {IPingResult}   from './common/models';
import {generateTxnId} from './common/util';

class Project {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getProjectTemplate(): Promise<IPingResult> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method' : 'getTemplate',
            'params' : {
                'type': 'project',
                'name': 'default'
            },
            'id'     : generateTxnId()
        });
    }

    listProjects(): Promise<IPingResult> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method' : 'list',
            'id'     : generateTxnId()
        });
    }

    listProjectsByDid(did: string): Promise<IPingResult> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method' : 'listForDID',
            'params' : {'did': did},
            'id'     : generateTxnId()
        });
    }

    createProject(did: string, signature: string, projectData: any, createdDate: Date): Promise<IPingResult> {
        return sendPostJSON(this.hostname + '/api/project', {
            'jsonrpc': '2.0',
            'method' : 'create',
            'id'     : generateTxnId(),
            'params' : {
                'data'     : projectData,
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

export default Project;