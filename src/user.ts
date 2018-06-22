require('es6-promise');
import { Ixo } from '../index';
import { Signature } from './common/models';
import { BLOCKCHAIN_URI_TENDERMINT, BLOCKCHAIN_URI_REST } from './common/dummyData';


class User {
    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    generateLedgerObjectJson = (didDoc: any, signature: string, created: any) => {
        const signatureValue = [1, signature]
        return JSON.stringify({ payload: [10, didDoc], signature: { signatureValue, created } })
    }

    registerUserDid(data: any, signature: Signature): Promise<any> {
        const { signatureValue, created } = signature
        const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created)
        const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString("hex").toUpperCase()

        return fetch(BLOCKCHAIN_URI_TENDERMINT + '/broadcast_tx_sync?tx=0x' + ledgerObjectUppercaseHex)
            .then(function (response) {
                return response;
            }).catch((error) => {
                return error;
            });
    }

    getDidDoc(did: string) {
        return fetch(BLOCKCHAIN_URI_REST + 'did/' + did)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    var obj = {
                        error: response.statusText
                    }
                }
                return obj;
            }).catch((error) => {
                return error;
            });
    }
}

export default User;