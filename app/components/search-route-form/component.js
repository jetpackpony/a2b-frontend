import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-wrapper'],
  actions: {
    search() {
      this.get('submitSearch')({
        fromLocation: this.get('from'),
        toLocation: this.get('to')
      });
    },
    selectFrom(item) {
      this.set('from', item);
    },
    selectTo(item) {
      this.set('to', item);
    }
  }
});
