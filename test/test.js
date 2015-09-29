import assert    from 'assert';
import BasicAuth from '../';

describe('BasicAuth', function() {

  describe('#auth', function () {

    const client = 'ba-test'
    const secret = 'faa3c99aa89dcfe382fafe0d40e6b45c'

    const method = 'get'
    const target = 'https://my.magic-domain.edu/my-cool-api/path?my-dream-param=true&&'
    const targetBAHeaders = {
      Date          : 'Tue, 31 Mar 2015 16:00:00 GMT',
      Authorization : 'MWS ba-test:q+bH5U/XIO+QYaHAUEX98TPnJ/U='
    };

    it('should be true', function () {
      assert.deepEqual(BasicAuth({
        client_id     : client,
        client_secret : secret
      })({
        method  : method,
        path    : target,
        date    : new Date(targetBAHeaders.Date)
      }), targetBAHeaders);
    });

  });
});
