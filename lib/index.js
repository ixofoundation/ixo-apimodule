var cryptoUtil = require('./utils/cryptoUtil');
var network = require('./utils/network');

function Ixo() {
    this.cryptoUtil = cryptoUtil;
    this.network = network;
}

module.exports = Ixo;