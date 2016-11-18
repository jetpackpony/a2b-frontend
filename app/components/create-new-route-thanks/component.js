import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    resetForm() {
      this.get('resetForm')();
    }
  }
});
