import Network from './src/network';
import Project from './src/project';
import Agent from './src/agent';
import Claim from './src/claim';
import User from './src/user';
import Stats from './src/stats';
import Config from './src/config';
export class Ixo {
	network: Network;
	project: Project;
	agent: Agent;
	claim: Claim;
	user: User;
	stats: Stats;
	config: Config;

	constructor(BLOCKCHAIN_IP: string, BLOCK_SYNC_URL: string) {
		this.config = new Config(BLOCKCHAIN_IP, BLOCK_SYNC_URL);
		this.network = new Network(this);
		this.project = new Project(this);
		this.agent = new Agent(this);
		this.claim = new Claim(this);
		this.user = new User(this);
		this.stats = new Stats(this);
	}
}
