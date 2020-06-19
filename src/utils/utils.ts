import {sendGetJSON} from "./http";

class Utils {
  getSignData(data: any, msgType: string, RESTUrl: string) {
    const msgJson = JSON.stringify({type: msgType, value: data})
    const msgUppercaseHex = new Buffer(msgJson).toString('hex').toUpperCase();

    return sendGetJSON(RESTUrl + '/sign_data/0x' + msgUppercaseHex)
  }
}

export default Utils;
