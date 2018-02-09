import { getWeb3Instance } from './utils/authUtil';
import { generateJsonPayload } from './common/util';

const Eth = require('ethjs-query');

class Auth {
    getCredentialProvider(provider: any): any {
        return getWeb3Instance(provider);
    }
}

export default Auth;