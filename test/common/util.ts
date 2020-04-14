import { IxoCredentialProvider, Signature } from "../../src/common/models";
import { Promise } from 'es6-promise';
import { generateJsonPayload } from "../../src/common/util";
const ethUtil = require('ethereumjs-util');
const ethWallet = require('ethereumjs-wallet')

export class MockProvider implements IxoCredentialProvider {
    ethereumWallet: any

    constructor() {
        this.ethereumWallet = ethWallet.generate();
    }

    toHex(s) {
        var hex = '';
        for (var i = 0; i < s.length; i++) { hex += '' + s.charCodeAt(i).toString(16); }
        return `0x${hex}`;
    }

    sign(dataToSign: any, templateName?: string): Promise<Signature> {
        return new Promise((resolve, reject) => {
            const payload = generateJsonPayload(dataToSign, this.getDid(), templateName);
            var sig = ethUtil.ecsign(ethUtil.hashPersonalMessage(ethUtil.toBuffer(payload)), this.ethereumWallet.getPrivateKey());
            var serialized = ethUtil.bufferToHex(Buffer.concat([sig.r, sig.s, ethUtil.toBuffer(sig.v - 27)]))

            return resolve(new Signature('ECDSA', new Date(), this.getDid(), this.getDid(), serialized));
        })
    }

    getDid() {
        return this.ethereumWallet.getAddressString();
    }
}