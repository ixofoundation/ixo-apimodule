import { sendPostJSON } from "./utils/http";
import { generateTxnId } from './common/util';
import { Ixo } from "../index";

class Network {
    ixo: Ixo;

    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    pingIxoServerNode(): Promise<any> {
        return sendPostJSON(this.ixo.hostname + '/api/network', {
            "jsonrpc": "2.0",
            "method": "ping",
            "id": generateTxnId()
        })
    }

}

export default Network;