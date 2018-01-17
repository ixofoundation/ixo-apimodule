import Network from "./src/network";
import CryptoUtil from "./src/cryptoUtil";
import Auth from "./src/auth";
import Project from "./src/project";

export default class Ixo {
    hostname: string;
    network: Network;
    cryptoUtil: CryptoUtil;
    auth: Auth;
    project: Project;

    constructor(hostname: string) {
        this.hostname = hostname;
        this.network = new Network(hostname);
        this.cryptoUtil = new CryptoUtil();
        this.auth = new Auth();
        this.project = new Project(hostname);
    }

}


