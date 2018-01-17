import {Promise} from "es6-promise";
import {ICredentialProviderResult} from "../models";

var loadjs = require('loadjs');
declare const Web3: any;

export function getWeb3Instance(provider: any): Promise<ICredentialProviderResult> {
    return new Promise((resolve, reject) => {
        loadjs('https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.min.js', 'web3');
        loadjs.ready('web3', {
            success: function () {
                if (typeof provider !== 'undefined') {
                    var credentialProvider: ICredentialProviderResult = {
                        provider: provider,
                        credentialProviderInstance: new Web3(provider)
                    };
                    resolve(credentialProvider);
                } else {
                    var credentialProvider: ICredentialProviderResult = {
                        provider: provider,
                        credentialProviderInstance: new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
                    };
                    resolve(credentialProvider);
                }
            },
            error: function (depsNotFound: any) {
                reject(new Error(depsNotFound))
            }
        });
    });


}


