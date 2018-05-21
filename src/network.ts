import { sendPostJSON } from "./utils/http";
import { generateTxnId } from './common/util';
import { Ixo } from "../index";

class Network {
    ixo: Ixo;

    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    pingIxoServerNode(): Promise<any> {
        return fetch('http://localhost:5000'
    ).then(function(response) {
            return response.text();
          }).catch((error) => {
            return error;
          });
    }

}

export default Network;