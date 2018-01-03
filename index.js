exports.pingIxo = function () {
    console.log("ixo function call successfull!!!");
}

exports.generateMnemonic = function () {
    var bip39 = require('bip39');
    return bip39.generateMnemonic();
}