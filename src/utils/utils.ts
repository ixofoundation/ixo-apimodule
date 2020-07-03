import {sendPostJSON} from "./http";
import Config from "../config";

class Utils {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getSignData(data: any, msgType: string, pubKey: string) {
    const msgJson = JSON.stringify({type: msgType, value: data})
    const msgUppercaseHex = new Buffer(msgJson).toString('hex').toUpperCase();
    const postFormat = {msg: msgUppercaseHex, pub_key: pubKey}

    return sendPostJSON(this.config.getBlockSyncUrl() + '/api/sign_data', postFormat)
  }
}

export default Utils;
