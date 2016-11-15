import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  email: null,
  password: null,
  actions: {
    authenticate() {
      let {email, password} = this.getProperties("email", "password");
      this.get('session')
        .authenticate('authenticator:oauth2', email, password)
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        });
    }
  }
});
