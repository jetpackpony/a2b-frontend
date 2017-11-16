import Ember from 'ember';
import RSVP from  'rsvp';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  errorMessage: "",
  email: "",
  showSpinner: false,
  actions: {
    submitForm() {
      this.set('showSpinner', true);
      this.register();
    },
  },
  register() {
    let user = this.get('store').createRecord('user');
    user.set('email', this.get('email'));
    user.set('password', '');
    if (!this.validateUser(user)) {
      this.set('showSpinner', false);
      return false;
    }

    user.save()
      .catch((error) => this.set('errorMessage', error))
      .then(() => (
        this.get('session')
          .authenticate(
            'authenticator:oauth2',
            user.get('email'),
            user.get('password')
          )
      ))
      .then(() => {
        this.set('showSpinner', false);
        return RSVP.resolve(...arguments);
      })
      .then(this.get('authComplete'));
  },
  validateUser(user) {
    this.set('errors', { email: false });
    this.set('errors.email', isEmailHasErrors(user.get('email')));
    return !this.get('errors').email;
  }
});

const isEmailHasErrors = (email) => (
  !email || !/.+@.+\..{2,}/.exec(email)
)
