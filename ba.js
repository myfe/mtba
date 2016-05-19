const url    = require('url');
const crypto = require('crypto');

/**
 * [exports MeituanBasicAuth]
 * @param  {[string|object]} client_id      [client_id]
 * @param  {[string]}        client_secret  [client_secret]
 * @return {[function]}                     [description]
 */
module.exports = function MeituanBasicAuth(client_id, client_secret) {

  const SPACE = ' ';
  const SPL   = ':';
  const EOL   = '\n';

  if(typeof client_id == 'object'){
    var o = client_id;
    client_id       = o.client_id;
    client_secret   = o.client_secret;
  }

  /**
   * [Calculate Signature]
   * @param  {[string]} method [http verb]
   * @param  {[string]} path   [http path]
   * @param  {[date]} date     [datetime]
   * @return {[object]}        [headers]
   */
  return function (method, path, date) {
    if(arguments.length == 1) {
      path = method;
      method = null;
    };
    path    = url.parse(path || '/').pathname;
    method  = (method || 'GET').toUpperCase();
    date    = (date || new Date).toGMTString();
    // step1. GET /path
    var req = [ method, path ].join(SPACE);
    // step2. step1 + GMT date string .
    var header = [req, date].join(EOL);
    // step3. encrypt request
    var sha1 = crypto.createHmac('sha1', client_secret);
    // step4. base64ify.
    var token = sha1.update(header).digest('base64');
    // xxx:xxx
    var signature = [client_id, token].join(SPL);
    var authorization = ['MWS', signature].join(SPACE);

    return {
      Date          : date,
      Authorization : authorization
    };
  };
}
