import { IxoCredentialProvider, Signature } from '../common/models'
import { generateJsonPayload } from '../common/util';
import { Promise } from 'es6-promise';
const Eth = require('ethjs-query');

class Web3Provider implements IxoCredentialProvider {
    provider: any;

    constructor(provider: any) {
        this.provider = provider;
    }

    sign(dataToSign: string, templateName?: string): Promise<Signature> {
        return new Promise((resolve, reject) => {
            if (this.provider && dataToSign) {
                var eth = new Eth(this.provider.currentProvider);
                var did = this.getDid();
                let payload = generateJsonPayload(dataToSign, did, templateName)
                var msg = '0x' + new Buffer(payload).toString('hex');

                eth.personal_sign(msg, did)
                    .then((signature: string) => {
                        return resolve(new Signature('ECDSA', new Date(), did, did, signature))
                    })
            } else {
                return reject(new Error(`Provider or data to sign is missing!`));
            }
        });
    }

    getDid(): string {
        return this.provider.eth.accounts[0];
    }
}

export default Web3Provider;