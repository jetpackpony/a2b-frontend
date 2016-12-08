import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['fromCoords', 'toCoords', 'fromCity', 'toCity'],
  fromCoords: null,
  toCoords: null,
  fromCity: null,
  toCity: null,
  sortedItineraries: Ember.computed.sort('model', function(a, b) {
    let aStops = a.get('stops');
    let bStops = b.get('stops');
    if (aStops > bStops) {
      return 1;
    } else if (aStops < bStops) {
      return -1;
    }
    let aDur = a.get('duration');
    let bDur = b.get('duration');
    if (aDur > bDur) {
      return 1;
    } else if (aDur < bDur) {
      return -1;
    }
    return 0;
  }),
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
