import Network from './src/network';
import Project from './src/project';
import Agent from './src/agent';
import Claim from './src/claim';
import User from './src/user';
import Stats from './src/stats';
import Config from './src/config';
import Treasury from "./src/treasury";
import Bonds from "./src/bonds";

export class Ixo {
  network: Network;
  project: Project;
  agent: Agent;
  claim: Claim;
  user: User;
  treasury: Treasury;
  bonds: Bonds;
  stats: Stats;
  config: Config;

  constructor(BLOCK_SYNC_URL: string) {
    this.config = new Config(BLOCK_SYNC_URL);
    this.network = new Network(this.config);
    this.project = new Project(this.config);
    this.agent = new Agent();
    this.claim = new Claim();
    this.user = new User(this.config);
    this.treasury = new Treasury();
    this.bonds = new Bonds();
    this.stats = new Stats(this.config);
  }
}
