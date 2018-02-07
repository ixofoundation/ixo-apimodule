import {getWeb3Instance} from './utils/authUtil';
import {Promise}         from 'es6-promise';

const Eth = require('ethjs-query');

class Auth {
    getCredentialProvider(provider: any): any {
        return getWeb3Instance(provider);
    }

    sign(provider: any, dataToSign: any): Promise<string> {
        return new Promise((resolve, reject) => {
            if (provider && dataToSign) {
                var eth = new Eth(provider.currentProvider);
                var account = provider.eth.accounts[0];
                var msg = '0x' + new Buffer(JSON.stringify(dataToSign)).toString('hex')
                return resolve(eth.personal_sign(msg, account));
            } else {
                return reject(new Error(`Provider or data to sign is missing!`));
            }
        });
    }
}

export default Auth;