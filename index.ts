import Network from './src/network';
import Project from './src/project';
import Agent from './src/agent';
import Claim from './src/claim';
import User from './src/user';
import Stats from './src/stats';
import Config from './src/config';
import Utils from './src/utils/utils'

export class Ixo {
  network: Network;
  project: Project;
  agent: Agent;
  claim: Claim;
  user: User;
  stats: Stats;
  config: Config;
  utils: Utils;

  constructor(BLOCK_SYNC_URL: string) {
    this.config = new Config(BLOCK_SYNC_URL);
    this.network = new Network(this.config);
    this.project = new Project(this.config);
    this.agent = new Agent();
    this.claim = new Claim();
    this.user = new User(this.config);
    this.stats = new Stats(this.config);
    this.utils = new Utils(this.config);
  }
}
