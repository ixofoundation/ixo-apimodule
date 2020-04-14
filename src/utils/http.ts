require('es6-promise').polyfill();
import 'cross-fetch/polyfill';
import {IDictionary} from '../common/models';
import * as Immutable from 'immutable';

/** Utility method for sending a POST request to the specified URL */
export function sendPostJSON<T>(url: string, body: IDictionary<any>, extraHeaders?: IDictionary<string>): Promise<T> {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: getJSONRequestHeaders(extraHeaders),
    credentials: 'same-origin'
  })
    .then((response: any) => {
      return response.json();
    })
    .then(checkServerError)
    .catch((error: any) => {
      throw error;
    });
}

/** Utility method for sending a POST request to the specified URL */
export function sendGetJSON<T>(url: string, extraHeaders?: IDictionary<string>): Promise<T> {
  return fetch(url, {
    method: 'GET',
    headers: getJSONRequestHeaders(extraHeaders),
    credentials: 'same-origin'
  })
    .then((response: any) => {
      return response.json();
    })
    .then(checkServerError)
    .catch((error: any) => {
      throw error;
    });
}

/** Merge default JSON headers with any extra headers passed to it */
function getJSONRequestHeaders(extraHeaders?: IDictionary<string>): IDictionary<string> {
  let requestHeaders: IDictionary<string> = {Accept: 'application/json', 'Content-Type': 'application/json'};
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
export function checkServerError(response: any) {
  if (response.status === 'error') {
    throw response;
  } else {
    return response;
  }
}
