import {sendPostJSON} from "./http";
import {IPingResult} from "../models";

export class Network {

    pingIxoServerNode(hostName: string): Promise<IPingResult> {
        return sendPostJSON(hostName, {"jsonrpc": "2.0", "method": "ping", "id": 1})
    }
}

