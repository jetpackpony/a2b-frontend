import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['fromId', 'toId', 'fromCity', 'toCity'],
  fromId: null,
  toId: null,
  fromCity: null,
  toCity: null,

  sortParams: ['stops', 'duration'],
  sortedItineraries: Ember.computed.sort('model', 'sortParams'),

  formFilled: Ember.computed('fromId', 'toId', function() {
    return this.get('fromId') !== null && this.get('toId') !== null &&
      this.get('fromId') !== "" && this.get('toId') !== "";
  }),

  actions: {
    search(params) {
      this.transitionToRoute({
        queryParams: {
          fromId: params.fromLocation.get('id'),
          fromCity: params.fromLocation.get('name'),
          toId: params.toLocation.get('id'),
          toCity: params.toLocation.get('name')
        }
      });
    }
  }
});
