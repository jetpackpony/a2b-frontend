import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isRegisterForm: true,
  errorMessage: null,
  actions: {
    toggleLoginForm() {
      this.set('isRegisterForm', !this.get('isRegisterForm'));
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
