require('es6-promise');
import { sendPostJSON } from './utils/http';
import { generateTxnId, constructJsonRequest, constructJsonSignRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';

const signature = {  
    type:"ECDSA",
    created: new Date(),
    creator: "did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f",
    publicKey: "0x279291ddf089c0e07c237fa70d86691432c0441c",
    signature: "0x0dacb44285cbf3b3c96301283b63720255f4e9bf810d649aa318c4bd0ec1e3515146e44a5c3d7c6c5ecb0834578a6cf1b67c5498c1b361769f61a968631d32e800"
 }
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
                return constructJsonSignRequest('did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f', 'createProject', templateName, signature, projectData);
            }).then((json: any) => {
                return resolve(sendPostJSON(PDSUrl+'api/request', json));
            })
        });
    }
}

export default Project;