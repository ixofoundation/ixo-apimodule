import {sendPostJSON} from "./utils/http";
import {IPingResult} from "./models";

class Project {
    hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;
    }

    getProjectTemplate(): Promise<IPingResult> {
        return sendPostJSON(this.hostname + '/api/project', {
            "jsonrpc": "2.0",
            "method": "getTemplate",
            "params": {"type": "project", "name": "default"},
            "id": 1
        })
    }
}

export default Project;