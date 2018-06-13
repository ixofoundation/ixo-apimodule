require('dotenv').config();
import Network from './src/network';
import CryptoUtil from './src/cryptoUtil';
import Project from './src/project';
import Agent from './src/agent';
import Claim from './src/claim';
import User from './src/user';

export class Ixo {
    network: Network;
    cryptoUtil: CryptoUtil;
    project: Project;
    agent: Agent;
    claim: Claim;
    user: User;

    constructor() {
        this.network = new Network(this);
        this.cryptoUtil = new CryptoUtil();
        this.project = new Project(this);
        this.agent = new Agent(this);
        this.claim = new Claim(this);
        this.user = new User(this);
    }
}

