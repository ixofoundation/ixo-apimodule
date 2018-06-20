require('es6-promise');
import { sendPostJSON } from './utils/http';
import { constructJsonSignRequest, constructPublicJsonRequest, constructJsonRequest } from './common/util';
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
        const payload = { projectDid: projectDid };
        return sendPostJSON(BLOCKCHAIN_URI + '/api/project/', constructPublicJsonRequest('listProjectByDid', payload));
    }

    createProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            const json = constructJsonSignRequest('createProject', 'create_project', signature, data);
            resolve(sendPostJSON(PDSUrl + 'api/request', json));
        });
    }

    createPublic(data: any, contentType: any, PDSUrl: string) {
        let payload = {
            data: data,
            contentType: contentType
        }
        return new Promise((resolve) => {
            const json = constructPublicJsonRequest('createPublic', payload);
            resolve(sendPostJSON(PDSUrl + 'api/request', json));
        });
    }

    fetchPublic(key: any, PDSUrl: string) {
        let payload = {
            key: key
        }
        return new Promise((resolve) => {
            const json = constructPublicJsonRequest('fetchPublic', payload);
            resolve(sendPostJSON(PDSUrl + 'api/request', json));
        });
    }
}

export default Project;
