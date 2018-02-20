require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';

class Project {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    getProjectTemplate(templateName: string): Promise<any> {
        const data = { 'name': templateName }
        return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getTemplate', data));
    }

    listProjects(): Promise<any> {
        const data = {}
        return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'list', data));
    }

    listProjectsByDid(did: string): Promise<any> {
        const data = { 'did': did }
        return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForDID', data));
    }

    listProjectsByDidAndRole(did: string, role: string): Promise<any> {
        const data = {
            'did': did,
            'role': role
        }
        return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForAgentDIDAndRole', data));
    }

    createProject(projectData: any, templateName: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(projectData, templateName).then((signature: Signature) => {
                return constructJsonSignRequest(this.ixo.credentialProvider.getDid(), projectData, 'create', templateName, signature);
            }).then((json: any) => {
                return resolve(sendPostJSON(this.ixo.hostname + '/api/project', json));
            })
        });
    }
}

export default Project;