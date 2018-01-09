const jayson = require('jayson/promise');

var pingIxoNode = function () {
    var client = jayson.client.https('https://arcane-stream-64697.herokuapp.com/api/network');

    var reqs = [
        client.request('ping', []),
    ];
    return Promise.all(reqs);
};

module.exports = {
    pingIxoNode: pingIxoNode
};