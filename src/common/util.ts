import { Ixo } from "../../index";
import { Signature } from "./models";

export function generateTxnId(): number {
    return Math.floor((Math.random() * 100000) + 1);
}

export function generateJsonPayload(data: string, did: string, templateName?: string): string {
    var response = {
        'did': did,
        'data': data
    };
    if (templateName) {
        return JSON.stringify({
            ...response, 'template': {
                'name': templateName
            }
        });
    } else {
        return JSON.stringify(response);
    }
}

export function constructJsonSignRequest(did: string, method: string, templateName: string, signature?: Signature, data?: string): any {
    var jsonRequest = {
        'jsonrpc': '2.0',
        'method': method,
        'id': generateTxnId(),
        'params': {
            'payload': {
                'data': data ? data : {}
            }
        }
    }
    if (templateName) {
        const jsonRequestTemp = {
            ...jsonRequest, 'params': {
                ...jsonRequest.params,
                'payload': { ...jsonRequest.params.payload, template: { name: templateName } }
            }
        };
        jsonRequest = jsonRequestTemp;
    }
    if (signature) {
        const jsonRequestTemp2 = {
            ...jsonRequest, 'params': {
                ...jsonRequest.params, signature: {
                    type: signature.type,
                    created: signature.created,
                    creator: signature.creator,
                    signatureValue: signature.signatureValue
                }
            }
        }
        jsonRequest = jsonRequestTemp2;
    }
    return jsonRequest;
}

export function constructJsonRequest(did: string, method: string, data: any, templateName?: string): any {
    const jsonRequest = {
        'jsonrpc': '2.0',
        'method': method,
        'id': generateTxnId(),
        'params': {
            'payload': {
                'data': data
            }
        }
    }

    if (templateName) {
        return {
            ...jsonRequest, 'params': {
                ...jsonRequest.params, 'payload': {
                    ...jsonRequest.params.payload, 'template': templateName
                }
            }
        }
    } else {
        return jsonRequest;
    }
}

export function constructPublicJsonRequest(method: string): any {
    const jsonRequest = {
        'jsonrpc': '2.0',
        'method': method,
        'id': generateTxnId(),
        'params': {
        }
    }
	return jsonRequest;
}
