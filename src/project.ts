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

    createPublic(source: any, PDSUrl: string) {
        let srcParts = source.split(',');
        let data = srcParts[1];
        let contentType = srcParts[0].split(';');
        contentType = contentType[0].split(':')[1];

        let payload = {
            data: data,
            contentType: contentType
        }
        return new Promise((resolve) => {
            const json = constructPublicJsonRequest('createPublic', payload);
            resolve(sendPostJSON(PDSUrl + 'api/public', json));
        });
    }

    fetchPublic(key: any, PDSUrl: string) {
        let payload = {
            key: key
        }

        return new Promise((resolve) => {
            const json = constructPublicJsonRequest('fetchPublic', payload);
            sendPostJSON(PDSUrl + 'api/public', json).then((response: any) => {
                resolve("data:" + response.result.contentType + ";base64," + response.result.data);
            })
        });
    }
}

export default Project;
