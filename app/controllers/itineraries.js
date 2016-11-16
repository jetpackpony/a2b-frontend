import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['fromCoords', 'toCoords', 'fromCity', 'toCity'],
  fromCoords: null,
  toCoords: null,
  fromCity: null,
  toCity: null,
  formFilled: Ember.computed('fromCoords', 'toCoords', function() {
    return this.get('fromCoords') !== null && this.get('toCoords') !== null &&
      this.get('fromCoords') !== "" && this.get('toCoords') !== "";
  }),
  actions: {
    search(queryParams) {
      this.transitionToRoute({ queryParams });
    }
  }
});
