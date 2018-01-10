"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('es6-promise').polyfill();
require('isomorphic-fetch');
var Immutable = require("immutable");
/** Utility method for sending a POST request to the specified URL */
function sendPostJSON(url, body, extraHeaders) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getJSONRequestHeaders(extraHeaders),
        credentials: 'same-origin',
        mode: 'no-cors'
    })
        .then(function (res) { return res.json(); })
        .then(checkServerError);
}
exports.sendPostJSON = sendPostJSON;
/** Merge default JSON headers with any extra headers passed to it */
function getJSONRequestHeaders(extraHeaders) {
    var requestHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (extraHeaders) {
        requestHeaders = Immutable.Map(extraHeaders)
            .merge(Immutable.Map(requestHeaders))
            .toJS();
    }
    return requestHeaders;
}
/**
 * Throw error when server returns a response with status 'error'
 * @param response - Response sent by server
 */
function checkServerError(response) {
    if (response.status === 'error') {
        throw response;
    }
    else {
        return response;
    }
}
exports.checkServerError = checkServerError;
