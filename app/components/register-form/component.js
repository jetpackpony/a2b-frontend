import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  torii: Ember.inject.service(),
  actions: {
    register() {
      //Validate it first!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let user = this.get('user');
      user.save().catch((error) => {
        this.set('errorMessage', error);
      }).then(() => {
        this.get('session')
          .authenticate('authenticator:oauth2', user.get('email'), user.get('password'))
          .catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
      });
    },
    loginWithFacebook() {
      this.get('torii')
        .open('facebook-connect')
        .then((auth) => {
          return this.get('session')
            .authenticate('authenticator:oauth2-credentials', auth.accessToken);

        })
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        });
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
