require('es6-promise');
import { sendPostJSON, sendGetJSON } from './utils/http';
import { constructJsonSignRequest, constructPublicJsonRequest } from './common/util';
import { Ixo } from '../index';
import { Signature } from './common/models';
class Project {
	ixo: Ixo;
	constructor(ixo: Ixo) {
		this.ixo = ixo;
	}

	listProjects(): Promise<any> {
		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/project/listProjects');
	}

	getProjectByProjectDid(projectDid: any): Promise<any> {
		return sendGetJSON(this.ixo.config.getBlockSyncUrl() + '/api/project/getByProjectDid/' + projectDid);
	}

	getProjectByUserDid(senderDid: any): Promise<any> {
		const payload = { senderDid: senderDid };
		return sendPostJSON(this.ixo.config.getBlockSyncUrl() + '/api/project/', constructPublicJsonRequest('listProjectBySenderDid', payload));
	}

	createProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
		return new Promise(resolve => {
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
		};
		return new Promise(resolve => {
			const json = constructPublicJsonRequest('createPublic', payload);
			resolve(sendPostJSON(PDSUrl + 'api/public', json));
		});
	}

	fetchPublic(key: any, PDSUrl: string) {
		let payload = {
			key: key
		};
		return new Promise((resolve, reject) => {
			const json = constructPublicJsonRequest('fetchPublic', payload);
			sendPostJSON(PDSUrl + 'api/public', json).then((response: any) => {
				if (response.result.data) {
					let obj = {
						data: response.result.data,
						contentType: response.result.contentType
					};
					resolve(obj);
				} else {
					reject(null);
				}
			});
		});
	}
}

export default Project;
