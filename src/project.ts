require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import * as Dummy from './common/dummyData';
import { Ixo } from '../index';
import { Signature } from './common/models';

class Project {

    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    // COMMENTED OUT CODE NEEDS TO BE REIMPLEMENTED WITH THE PROJECT DOC ONCE THE BLOCKCHAIN IS UP
    // getProjectTemplate(templateName: string): Promise<any> {
    //     const data = { 'name': templateName }
    //     return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'getTemplate', data));
    // }

    // listProjects(): Promise<any> {
    //     const data = {}
    //     return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'list', data));
    // }

    // listProjectsByDid(did: string): Promise<any> {
    //     const data = { 'did': did }
    //     return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForDID', data));
    // }

    // listProjectsByDidAndRole(did: string, role: string): Promise<any> {
    //     const data = {
    //         'did': did,
    //         'role': role
    //     }
    //     return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'listForAgentDIDAndRole', data));
    // }

    // findProjectById(id: string): Promise<any> {
    //     const data = { '_id': id }
    //     return sendPostJSON(this.ixo.hostname + '/api/project', constructJsonRequest(this.ixo.credentialProvider.getDid(), 'list', data));
    // }
    
    createProject(projectData: any, templateName: string, PDSUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.ixo.credentialProvider.sign(projectData, templateName).then((trueSig: Signature) => {
                return constructJsonSignRequest(Dummy.DID, 'createProject', templateName, Dummy.signature, projectData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }
}

export default Project;