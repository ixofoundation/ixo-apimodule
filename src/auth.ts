import {getWeb3FromBrowser} from "./utils/authUtil";

export class Auth {
    
    getWeb3Instance() : Promise<any> {
        return getWeb3FromBrowser();
    }
}