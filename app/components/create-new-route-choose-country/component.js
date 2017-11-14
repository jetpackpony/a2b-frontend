import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    countryChanged() {
      this.get('onCountryChanged')(event.target.value);
    }
  }
});
