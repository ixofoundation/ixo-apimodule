import { Promise } from 'es6-promise';
import web3Provider from './web3Provider';
var loadjs = require('loadjs');
declare const Web3: any;

export function resolveProvider(provider: any): Promise<any> {
    return new Promise((resolve, reject) => {
        if (provider.currentProvider.isMetaMask) {
            getWeb3Instance(provider.currentProvider).then((provider: any) => {
                return resolve(new web3Provider(provider));
            })
        }
    });
}

function getWeb3Instance(provider: any): Promise<any> {
    return new Promise((resolve, reject) => {
        loadjs('https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.min.js', 'web3');
        loadjs.ready('web3', {
            success: function () {
                if (typeof provider !== 'undefined') {
                    resolve(new Web3(provider));
                } else {
                    resolve(new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545')));
                }
            },
            error: function (depsNotFound: any) {
                reject(new Error(depsNotFound));
            }
        });
    });
}