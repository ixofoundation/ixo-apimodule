import {getWeb3Instance} from './utils/authUtil';

const Eth = require('ethjs');
const ethUtil = require('ethereumjs-util');

class Auth {

    getCredentialProvider(provider: any): any {
        return getWeb3Instance(provider);
    }

    sign(provider: any, dataToSign: any): Promise<string> {
        var eth = new Eth(provider.currentProvider);
        var account = provider.eth.accounts[0];
        var msg = ethUtil.bufferToHex(new Buffer(JSON.stringify(dataToSign), 'utf8'));

        return eth.personal_sign(msg, account);
    }

}

export default Auth;