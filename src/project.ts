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
        return sendPostJSON('https://ixo-block-sync.herokuapp.com/api/project', constructPublicJsonRequest('listProjects'));
    }
    
    createProject(data: any, signature:any, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
			const json = constructJsonSignRequest(signature.did, 'createProject', 'create_project', signature, data);
			resolve(sendPostJSON(PDSUrl+'api/request', json));
        });
    }
}

export default Project;
