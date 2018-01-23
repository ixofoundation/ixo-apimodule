import {sendPostJSON}  from "./utils/http";
import {generateTxnId} from './common/util';

class Network {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    pingIxoServerNode(): Promise<any> {
        return sendPostJSON(this.hostname + '/api/network', {
            "jsonrpc": "2.0",
            "method": "ping",
            "id": generateTxnId()
        })
    }

}

export default Network;