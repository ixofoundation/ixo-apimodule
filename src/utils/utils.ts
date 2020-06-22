import {sendGetJSON} from "./http";
import Config from "../config";

class Utils {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getSignData(data: any, msgType: string) {
    const msgJson = JSON.stringify({type: msgType, value: data})
    const msgUppercaseHex = new Buffer(msgJson).toString('hex').toUpperCase();

    return sendGetJSON(this.config.getBlockSyncUrl() + '/api/sign_data/' + msgUppercaseHex)
  }
}

export default Utils;
