import {Promise} from "es6-promise";
import {ICredentialProviderResult} from "../models";

const Web3 = require("web3");

export function getWeb3Instance(provider: any): Promise<ICredentialProviderResult> {
    return new Promise((resolve, reject) => {
        if (provider) {
            var credentialProvider = {
                provider: provider,
                credentialProviderInstance: new Web3(provider)
            };
            resolve(credentialProvider);
        } else {
            reject(new Error('Provider is null or empty!'));
        }
    });
}


