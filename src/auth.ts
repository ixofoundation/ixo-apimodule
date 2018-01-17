import {getWeb3Instance} from "./utils/authUtil";

class Auth {
    getCredentialProvider(provider: any): any {
        return getWeb3Instance(provider);
    }
}

export default Auth;