require('es6-promise');
import * as Dummy from './common/dummyData';
import { Ixo } from '../index';
import { Signature } from './common/models';

class User {
    ixo: Ixo;
    constructor(ixo: Ixo) {
        this.ixo = ixo;
    }

    generateLedgerObjectJson = (didDoc: string, signature: string, created: any) => {
        const signatureValue = [1, signature]
        return JSON.stringify({ payload: [10, didDoc], signature: { signatureValue, created } })
    }

    registerUserDid(data: any, signature: Signature): Promise<any> {
        const { signatureValue, created } = signature
        const ledgerObjectJson = this.generateLedgerObjectJson(data, signatureValue, created)
        const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson).toString("hex").toUpperCase()

        return fetch(process.env.BLOCKCHAIN_URI_TENDERMINT + '/broadcast_tx_sync?tx=0x' + ledgerObjectUppercaseHex)
            .then(function (response) {
                return response;
            }).catch((error) => {
                return error;
            });
    }
}

export default User;