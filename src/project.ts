require('es6-promise');
import { sendPostJSON } from './utils/http';
import { constructJsonSignRequest, constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';
import { BLOCKCHAIN_URI } from './common/dummyData';

class Project {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    listProjects(): Promise<any> {
        return sendPostJSON(BLOCKCHAIN_URI + '/api/project/', constructPublicJsonRequest('listProjects'));
	}
	
	getProjectByDid(projectDid: any): Promise<any> {
		const payload = {ProjectDid: projectDid};
        return sendPostJSON(BLOCKCHAIN_URI + '/api/project/', constructPublicJsonRequest('listProjectByDid', payload));
    }
    
    createProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest('createProject', 'create_project', signature, data);
			resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }
}

export default Project;
