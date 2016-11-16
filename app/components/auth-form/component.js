import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isRegisterForm: true,
  errors: { email: false, password: false, passwordConfirm: false },
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
  _validate(user) {
    this.set('errors', { email: false, password: false, passwordConfirm: false });
    let email = user.get('email');
    let pass1 = user.get('password');
    let pass2 = user.get('passwordConfirm');
    this.set('errors.email', (!email || !/.+@.+\..{2,}/.exec(email)));
    this.set('errors.password', (!pass1 || pass1.length < 4));
    if (this.get('isRegisterForm')) {
      this.set('errors.passwordConfirm', (!pass2 || pass2 !== pass1));
    }
    let err = this.get('errors');
    if (err.email || err.password || err.passwordConfirm) {
      return false;
    } else {
      return true;
    }
  },
  _register() {
    let user = this.get('user');
    if (!this._validate(user)) {
      return false;
    }
    user.save().catch((error) => {
      this.set('errorMessage', error);
    }).then(() => {
      this.get('session')
        .authenticate('authenticator:oauth2', user.get('email'), user.get('password'))
        .catch((reason) => {
          console.log('server request failed', reason);
          this.set('errorMessage', reason.error_description || "Server error occured");
        });
    });
  },
  _login() {
    let user = this.get('user');
    if (!this._validate(user)) {
      return false;
    }
    this.get('session')
      .authenticate('authenticator:oauth2', user.get('email'), user.get('password'))
      .catch((reason) => {
        console.log('server request failed', reason);
        this.set('errorMessage', reason.error_description || "Server error occured");
      });
  }
});
