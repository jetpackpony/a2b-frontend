import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  torii: Ember.inject.service(),
  authComplete: () => {},
  actions: {
    login() {
      this.get('torii')
        .open('facebook-connect')
        .then((auth) => this.saveSession(auth.accessToken))
        .then(this.get('authComplete'), this.logError);
    }
  },
  saveSession(token) {
    return this.get('session')
      .authenticate('authenticator:oauth2-credentials', token);
  },
  logError(reason) {
    console.log('login failed', reason);
    this.set('errorMessage', getErrorText(reason));
  }
});

const getErrorText = (reason) => (
  reason.error_description
  || ((reason === 'not_authorized')
    ? "You cancelled the auth with facebook"
    : "Server error occured")
);
