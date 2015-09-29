import url    from 'url';
import crypto from 'crypto';

export default function MeituanBasicAuth({ client_id, client_secret }){

  const SPACE = ' ';
  const EOL   = '\n';

  return function({ path = '/', method = 'GET', date = new Date }){
    //
    date    = date.toGMTString();
    method  = method.toUpperCase();
    path    = url.parse(path).pathname;
    // step1. GET /path
    let req           = [ method, path ].join(SPACE);
    // step2. step1 + GMT date string .
    let header        = [ req , date ].join(EOL);
    // step3. encrypt request
    let sha1          = crypto.createHmac('sha1', client_secret);
    // step4. base64ify.
    let token         = sha1.update(header).digest('base64');
    // xxx:xxx
    let signature     = [ client_id, token ].join(':');
    let authorization = [ 'MWS', signature ].join(SPACE);

    return {
      Date          : date,
      Authorization : authorization
    };
  }
}
