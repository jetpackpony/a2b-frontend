import Ember from 'ember';

export default Ember.Component.extend({
  locations: Ember.inject.service(),
  classNames: ['form-wrapper'],
  fromLocation: null,
  toLocation: null,
  actions: {
    search() {
      this.get('submitSearch')({
        fromLocation: this.get('fromLocation'),
        toLocation: this.get('toLocation')
      });
    },
    filterLocations(value) {
      return this.get('locations').filter(value);
    },
    selectFrom(item) {
      this.set('fromLocation', item);
    },
    selectTo(item) {
      this.set('toLocation', item);
    }
  }
});
