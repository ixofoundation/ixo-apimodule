const bip39 = require('bip39');
const sovrin = require('sovrin-did');
const crypto = require('crypto');
const base58 = require('bs58');

var generateMnemonic = function () {
    return bip39.generateMnemonic();
};

var generateSovrinDID = function (mnemonic) {
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    // Create the Sovrin DID
    return sovrin.fromSeed(didSeed);
};

var getDocumentSignature = function (privateKey, publicKey, inputFile) {
    return base58.encode(sovrin.signMessage(new Buffer(JSON.stringify(inputFile)), privateKey, publicKey));
};

module.exports = {
    generateSovrinDID: generateSovrinDID,
    generateMnemonic: generateMnemonic,
    getDocumentSignature: getDocumentSignature
};