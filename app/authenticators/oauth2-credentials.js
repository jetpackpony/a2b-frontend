import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';
const {
  RSVP,
  makeArray,
  isEmpty,
  run,
  assign
} = Ember;

const serverTokenEndpoint = `${ENV.a2b.apiEndPoint}/session/create`;

export default OAuth2PasswordGrant.extend({
  authenticate(code, scope = [], headers = {}) {
    return new RSVP.Promise((resolve, reject) => (
      this.makeRequest(
        serverTokenEndpoint,
        makeRequestData(code, scope),
        headers
      ).then(
        (response) => (
          run(() =>
            ((!isEmpty(response['access_token']))
              ? resolve(this._prepareResponse(response))
              : reject('access_token is missing in server response'))
          )
        ),
        (xhr) => (
          run(
            null,
            reject,
            (this.get('rejectWithXhr')
              ? xhr
              : (xhr.responseJSON || xhr.responseText))
          )
        )
      )
    ));
  },
  _prepareResponse(response) {
    const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
    this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
    return ((!isEmpty(expiresAt))
      ? assign(response, { 'expires_at': expiresAt })
      : response);
  }
});

const makeRequestData = (code, scope) => ({
  'grant_type': 'authorization_code',
  code,
  scope: makeArray(scope).join(' ')
});
