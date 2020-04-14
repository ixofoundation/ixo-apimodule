import Config from './config';

class Network {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  pingIxoExplorer(): Promise<any> {
    return fetch(this.config.getBlockSyncUrl())
      .then(function (response: any) {
        return response.text();
      })
      .catch(error => {
        return error;
      });
  }
}

export default Network;
