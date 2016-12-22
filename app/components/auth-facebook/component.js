import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  torii: Ember.inject.service(),
  actions: {
    login() {
      this.get('torii')
        .open('facebook-connect')
        .then((auth) => {
          return this.get('session')
            .authenticate('authenticator:oauth2-credentials', auth.accessToken);
        })
        .then(() => {
          let authComplete = this.get('authComplete');
          if (authComplete && typeof(authComplete) === 'function') {
            authComplete();
          }
        })
        .catch((reason) => {
          console.log('server request failed', reason);
          let error = "Server error occured";
          if (reason === 'not_authorized') {
            error = "You cancelled the auth with facebook";
          }
          this.set('errorMessage', reason.error_description || error);
        });
    }
  }
});
