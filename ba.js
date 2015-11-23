const url    = require('url');
const crypto = require('crypto');

/**
 * [exports MeituanBasicAuth]
 * @param  {[type]} client_id     [description]
 * @param  {[type]} client_secret [description]
 * @return {[type]}               [description]
 */
module.exports = function MeituanBasicAuth(client_id, client_secret) {

  const SPACE = ' ';
  const SPL   = ':';
  const EOL   = '\n';
  /**
   * [Calculate Signature]
   * @param  {[type]} method [description]
   * @param  {[type]} path   [description]
   * @param  {[type]} date   [description]
   * @return {[type]}        [description]
   */
  return function (method, path, date) {
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
