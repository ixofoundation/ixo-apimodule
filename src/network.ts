import { Ixo } from "../index";
import { BLOCKCHAIN_URI_TENDERMINT, BLOCKCHAIN_URI } from "./common/dummyData";

class Network {
    ixo: Ixo;

    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    pingIxoBlockchain(): Promise<any> {
        return fetch(BLOCKCHAIN_URI_TENDERMINT + '/health'
    ).then(function(response) {
            return response.text();
          }).catch((error) => {
            return error;
          });
    }


    pingIxoExplorer(): Promise<any> {
        return fetch(BLOCKCHAIN_URI
    ).then(function(response) {
            return response.text();
          }).catch((error) => {
            return error;
          });
    }
}

export default Network;