export interface IPingIxoNode {
    status: string;
}
export interface IDictionary<T> {
    [key: string]: T;
}
export interface ISovrinDidModel {
    did: string;
    verifyKey: string;
    secret: ISovrinDidSecretModel;
}
export interface ISovrinDidSecretModel {
    seed: string;
    signKey: string;
}
export interface IPingResult {
    jsonrpc: string;
    id: number;
    result: string;
}
