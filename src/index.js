const bip39 = require('bip39');
const sovrin = require('sovrin-did');

exports.pingIxo = function () {
    console.log("ixo function call successful!!!");
}

exports.generateMnemonic = function () {
    return bip39.generateMnemonic();
}

exports.generateSovrinDID = function (mnemonic) {
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    // Create the Sovrin DID
    return sovrin.fromSeed(didSeed);
}