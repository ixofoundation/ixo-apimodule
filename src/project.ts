require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest, constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';

class Project {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    listProjects(): Promise<any> {
        return sendPostJSON(process.env.BLOCKCHAIN_URI + '/api/project/', constructPublicJsonRequest('listProjects'));
	}
	
	getProjectByDid(projectDid: any): Promise<any> {
        return sendPostJSON(process.env.BLOCKCHAIN_URI + '/api/project/', constructPublicJsonRequest('listProjectByDid', projectDid));
    }
    
    createProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('createProject', 'create_project', signature, data);
			resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }
}

export default Project;
