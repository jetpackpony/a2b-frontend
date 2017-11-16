import Ember from 'ember';

export default Ember.Component.extend({
  comment: null,
  actions: {
    toggleAddress() {
      this.get('toggleAddress')();
    }
  }
});
