import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    countryChanged() {
      this.get('countryChanged')(event.target.value);
    }
  }
});
