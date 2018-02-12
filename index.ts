import Network from './src/network';
import CryptoUtil from './src/cryptoUtil';
import Project from './src/project';
import Agent from './src/agent';
import { IxoCredentialProvider } from './src/common/models';
import Web3Provider from './src/providers/web3Provider';
import { resolveProvider } from './src/providers/providerResolver';

export class Ixo {
    hostname: string;
    credentialProvider: IxoCredentialProvider
    network: Network;
    cryptoUtil: CryptoUtil;
    project: Project;
    agent: Agent;

    constructor(hostname: string, credentialProvider?: IxoCredentialProvider) {
        if (credentialProvider) {
            this.credentialProvider = credentialProvider;
        }
        this.hostname = hostname;
        this.network = new Network(this);
        this.cryptoUtil = new CryptoUtil();
        this.project = new Project(this);
        this.agent = new Agent(this);
    }

    init(provider: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolveProvider(provider).then((provider: IxoCredentialProvider) => {
                this.credentialProvider = provider;
                return resolve(provider);
            }).catch((error: any) => {
                return reject(error);
            })
        })
    }
}

