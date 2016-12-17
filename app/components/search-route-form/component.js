import Ember from 'ember';

export default Ember.Component.extend({
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
    selectFrom(item) {
      this.set('fromLocation', item);
    },
    selectTo(item) {
      this.set('toLocation', item);
    }
  }
});
