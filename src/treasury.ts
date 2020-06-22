import {Signature} from './common/models';
import {sendGetJSON, sendPostJSON} from './utils/http';

require('es6-promise');

class Treasury {

  generateJson = (sendDetails: any, signature: string, created: any, msgType: string) => {
    return JSON.stringify({
      payload: [{type: msgType, value: sendDetails}],
      signatures: [{signatureValue: signature, created: created}]
    });
  }

  generateAndBroadcastViaRpc = (data: any, signature: Signature, CHAINUrl: string, msgType: string): Promise<any> => {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateJson(data, signatureValue, created, msgType);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();

    return sendGetJSON(CHAINUrl + '/broadcast_tx_commit?tx=0x' + ledgerObjectUppercaseHex);
  }

  generateAndBroadcastViaRest = (data: any, signature: Signature, RESTUrl: string, msgType: string): Promise<any> => {
    const {signatureValue, created} = signature;
    const ledgerObjectJson = this.generateJson(data, signatureValue, created, msgType);
    const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString('hex').toUpperCase();
    const broadcastFormat = {
      "mode": "block",
      "tx": ledgerObjectUppercaseHex
    }

    return sendPostJSON(RESTUrl + '/txs', broadcastFormat);
  }

  sendTokensViaRpc(data: any, signature: Signature, CHAINUrl: string): Promise<any> {
    return this.generateAndBroadcastViaRpc(data, signature, CHAINUrl, "treasury/MsgSend")
  }

  sendTokensViaRest(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcastViaRest(data, signature, RESTUrl, "treasury/MsgSend")
  }

  oracleMintTokensViaRest(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcastViaRest(data, signature, RESTUrl, "treasury/MsgOracleMint")
  }

  oracleBurnTokensViaRest(data: any, signature: Signature, RESTUrl: string): Promise<any> {
    return this.generateAndBroadcastViaRest(data, signature, RESTUrl, "treasury/MsgOracleBurn")
  }
}

export default Treasury;
