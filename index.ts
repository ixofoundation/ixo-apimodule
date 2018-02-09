import Network from './src/network';
import CryptoUtil from './src/cryptoUtil';
import Auth from './src/auth';
import Project from './src/project';
import Agent from './src/agent';
import { IxoCredentialProvider } from './src/common/models';
import Web3Provider from './src/providers/web3Provider';

export class Ixo {
    static Web3Provider = Web3Provider;
    
    hostname: string;
    credetialProvider: IxoCredentialProvider
    network: Network;
    cryptoUtil: CryptoUtil;
    auth: Auth;
    project: Project;
    agent: Agent;

    constructor(hostname: string, credetialProvider: IxoCredentialProvider) {
        this.hostname = hostname;
        this.credetialProvider = credetialProvider;
        this.network = new Network(this);
        this.cryptoUtil = new CryptoUtil();
        this.auth = new Auth();
        this.project = new Project(this);
        this.agent = new Agent(this);
    }
}

