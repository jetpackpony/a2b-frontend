import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  errors: { email: false },
  errorMessage: "",
  email: "",
  actions: {
    submitForm() {
      this._register();
    },
  },
  _register() {
    let user = this.get('store').createRecord('user');
    user.set('email', this.get('email'));
    user.set('password', '');
    if (!this._validate(user)) {
      return false;
    }
    user.save().catch((error) => {
      this.set('errorMessage', error);
    }).then(() => {
      return this.get('session')
        .authenticate(
          'authenticator:oauth2',
          user.get('email'),
          user.get('password')
        );
    }).then(this.get('authComplete'));
  },
  _validate(user) {
    this.set('errors', { email: false });
    let email = user.get('email');
    this.set('errors.email', (!email || !/.+@.+\..{2,}/.exec(email)));
    if (this.get('errors').email) {
      return false;
    } else {
      return true;
    }
  }
});
