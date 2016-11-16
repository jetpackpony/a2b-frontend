import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isRegisterForm: true,
  errors: Ember.A([]),
  errorMessage: "",
  actions: {
    submitForm() {
      if (this.get('isRegisterForm')) {
        this._register();
      } else {
        this._login();
      }
    },
  },
  _register() {
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
  _login() {
    let {email, password} = this.getProperties("email", "password");
    let user = this.get('user');
    this.get('session')
      .authenticate('authenticator:oauth2', user.get('email'), user.get('password'))
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
  }
});
