import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    countryChanged(value) {
      this.get('onCountryChanged')(value);
    }
  }
});
