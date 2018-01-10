"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bip39 = require('bip39');
var sovrin = require('sovrin-did');
var crypto = require('crypto');
var base58 = require('bs58');
var CryptoUtil = /** @class */ (function () {
    function CryptoUtil() {
    }
    CryptoUtil.prototype.generateMnemonic = function () {
        return bip39.generateMnemonic();
    };
    CryptoUtil.prototype.generateSovrinDID = function (mnemonic) {
        var seed = crypto.createHash('sha256').update(mnemonic).digest("hex");
        // Convert SHA256 hash to Uint8Array
        var didSeed = new Uint8Array(32);
        for (var i = 0; i < 32; ++i) {
            didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16);
        }
        // Create the Sovrin DID
        return sovrin.fromSeed(didSeed);
    };
    CryptoUtil.prototype.getDocumentSignature = function (privateKey, publicKey, inputFile) {
        return base58.encode(sovrin.signMessage(new Buffer(JSON.stringify(inputFile)), privateKey, publicKey));
    };
    CryptoUtil.prototype.verifyDocumentSignature = function (signature, publicKey) {
        return !(sovrin.verifySignedMessage(base58.decode(signature), publicKey) === false);
    };
    return CryptoUtil;
}());
exports.CryptoUtil = CryptoUtil;
