export declare class CryptoUtil {
    generateMnemonic(): any;
    generateSovrinDID(mnemonic: string): any;
    getDocumentSignature(privateKey: string, publicKey: string, inputFile: string): any;
    verifyDocumentSignature(signature: string, publicKey: string): boolean;
}
