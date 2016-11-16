import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
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
    logout() {
      this.get('session').invalidate();
    }
  }
});
