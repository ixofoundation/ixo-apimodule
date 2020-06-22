import {Signature} from './common/models';
import {sendPostJSON} from './utils/http';

require('es6-promise');

class Bonds {

  generateJson = (sendDetails: any, signature: string, created: any, msgType: string) => {
    return JSON.stringify({
      payload: [{type: msgType, value: sendDetails}],
      signatures: [{signatureValue: signature, created: created}]
    });
  }

  generateAndBroadcast = (data: any, signature: Signature, RESTUrl: string, msgType: string): Promise<any> => {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateJson(data, signatureValue, created, msgType);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();
    const broadcastFormat = {
      "mode": "block",
      "tx": ledgerObjectUppercaseHex
    }

    return sendPostJSON(RESTUrl + '/txs', broadcastFormat);
  }

  create(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcast(data, signature, RESTUrl, "bonds/MsgCreateBond")
  }

  buy(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcast(data, signature, RESTUrl, "bonds/MsgBuy")
  }

  sell(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcast(data, signature, RESTUrl, "bonds/MsgSell")
  }
}

export default Bonds;
