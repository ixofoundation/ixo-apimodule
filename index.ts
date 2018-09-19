import Network from './src/network';
import Project from './src/project';
import Agent from './src/agent';
import Claim from './src/claim';
import User from './src/user';
import Stats from './src/stats';
import Config from './src/config';
import Web3Proxy from './src/web3-proxy';
import Web3 from 'web3';

export class Ixo {
	network: Network;
	project: Project;
	agent: Agent;
	claim: Claim;
	user: User;
	stats: Stats;
	config: Config;
	web3Proxy: Web3Proxy;

	constructor(BLOCKCHAIN_IP: string, BLOCK_SYNC_URL: string) {
		this.config = new Config(BLOCKCHAIN_IP, BLOCK_SYNC_URL);
		this.network = new Network(this.config);
		this.project = new Project(this.config);
		this.agent = new Agent();
		this.claim = new Claim();
		this.user = new User(this.config);
		this.stats = new Stats(this.config);
	}

	initWeb3 = (provider: any, contractABI: string, contractAddress: string) => {
		this.
	};
}
