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
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        });
    }
  }
});
