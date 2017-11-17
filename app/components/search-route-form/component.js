import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-wrapper'],
  actions: {
    search() {
      this.get('submitSearch')({
        fromLocation: this.get('from'),
        toLocation: this.get('to')
      });
    }
  }
});
