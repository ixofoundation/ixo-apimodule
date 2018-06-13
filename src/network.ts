import { sendPostJSON } from "./utils/http";
import { generateTxnId } from './common/util';
import { Ixo } from "../index";

class Network {
    ixo: Ixo;

    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    pingIxoBlockchain(): Promise<any> {
        return fetch(process.env.BLOCKCHAIN_URI_TENDERMINT + '/health'
    ).then(function(response) {
            return response.text();
          }).catch((error) => {
            return error;
          });
    }


    pingIxoExplorer(): Promise<any> {
        return fetch(process.env.BLOCKCHAIN_URI
    ).then(function(response) {
            return response.text();
          }).catch((error) => {
            return error;
          });
    }
}

export default Network;