const jayson = require('jayson');

var pingIxoNode = function () {
    var client = jayson.client.https('https://arcane-stream-64697.herokuapp.com/api/network');
    client.request('ping', [], null, function (err, response) {
        if (err) throw err;
        console.log(response);
        return response;
    });

};

module.exports = {
    pingIxoNode: pingIxoNode
};