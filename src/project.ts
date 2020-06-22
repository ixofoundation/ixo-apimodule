require('es6-promise');
import {Signature} from './common/models';
import {constructJsonPartialSignRequest, constructJsonSignRequest, constructPublicJsonRequest} from './common/util';
import Config from './config';
import {sendGetJSON, sendPostJSON} from './utils/http';

class Project {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  listProjects(): Promise<any> {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/project/listProjects');
  }

  getProjectByProjectDid(projectDid: any): Promise<any> {
    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/project/getByProjectDid/' + projectDid);
  }

  getProjectByUserDid(senderDid: any): Promise<any> {
    const payload = {senderDid: senderDid};
    return sendPostJSON(this.config.getBlockSyncUrl() + '/api/project/', constructPublicJsonRequest('listProjectBySenderDid', payload));
  }

  createProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('createProject', 'create_project', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  updateProjectStatus(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('updateProjectStatus', 'project_status', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  fundProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonPartialSignRequest('fundProject', 'fund_project', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  createPublic(source: any, PDSUrl: string) {
    const srcParts = source.split(',');
    const data = srcParts[1];
    const contentType = srcParts[0].split(';')[0].split(':')[1];

    const payload = {
      data: data,
      contentType: contentType
    };

    const json = constructPublicJsonRequest('createPublic', payload);
    return sendPostJSON(PDSUrl + 'api/public', json);
  }

  fetchPublic(key: any, PDSUrl: string) {
    const payload = {
      key: key
    };
    return new Promise((resolve, reject) => {
      const json = constructPublicJsonRequest('fetchPublic', payload);
      sendPostJSON(PDSUrl + 'api/public', json)
        .then((response: any) => {
          if (response.result.data) {
            const obj = {
              data: response.result.data,
              contentType: response.result.contentType
            };
            resolve(obj);
          } else {
            reject(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  generateWithdrawObjectJson = (data: any, signature: string, created: any) => {
    return JSON.stringify({
      payload: [{type: "project/WithdrawFunds", value: data}],
      signatures: [{signatureValue: signature, created: created}]
    });
  }

  payOutToEthWallet(data: any, signature: Signature): Promise<any> {
    const {signatureValue, created} = signature;
    const withdrawObjectJson = this.generateWithdrawObjectJson(data, signatureValue, created);
    const withdrawObjectUppercaseHex = new Buffer(withdrawObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/blockchain/0x' + withdrawObjectUppercaseHex);
  }
}

export default Project;
