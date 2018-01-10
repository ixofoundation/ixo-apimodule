export interface IPingIxoNode {
    status: string
}

export interface ISovrinDidModel {
    did: string
    verifyKey: string
    secret: ISovrinDidSecretModel

}

export interface ISovrinDidSecretModel {
    seed: string
    signKey: string
}