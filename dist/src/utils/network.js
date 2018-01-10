"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
var Network = /** @class */ (function () {
    function Network() {
    }
    Network.prototype.pingIxoServerNode = function (hostName) {
        return http_1.sendPostJSON(hostName, { "jsonrpc": "2.0", "method": "ping", "id": 1 });
    };
    return Network;
}());
exports.Network = Network;
