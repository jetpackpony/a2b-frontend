import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setCountry() {
      this.attrs.setCountry(
          this.get('countries')[this.$('select')[0].selectedIndex - 1]
          );
    }
  }
});
