import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
const {
  RSVP,
  makeArray,
  isEmpty,
  run,
  assign: emberAssign
} = Ember;
const assign = emberAssign || merge;
export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/api/session/create',
  authenticate(code, scope = [], headers = {}) {
    return new RSVP.Promise((resolve, reject) => {
      const data                = { 'grant_type': 'authorization_code', code };
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const useXhr = this.get('rejectWithXhr');
      const scopesString = makeArray(scope).join(' ');
      if (!isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data, headers).then((response) => {
        run(() => {
          if (!this._validate(response)) {
            reject('access_token is missing in server response');
          }

          const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
          this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
          if (!isEmpty(expiresAt)) {
            response = assign(response, { 'expires_at': expiresAt });
          }

          resolve(response);
        });
      }, (xhr) => {
        run(null, reject, useXhr ? xhr : (xhr.responseJSON || xhr.responseText));
      });
    });
  },
  _validate(data) {
    return !isEmpty(data['access_token']);
  }
});
