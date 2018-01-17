import {sendPostJSON} from "./utils/http";

class Network {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    pingIxoServerNode(): Promise<any> {
        return sendPostJSON(this.hostname + '/api/network', {
            "jsonrpc": "2.0",
            "method": "ping",
            "id": 1
        })
    }

}

export default Network;