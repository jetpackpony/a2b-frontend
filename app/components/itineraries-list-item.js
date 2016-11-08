import Ember from 'ember';

export default Ember.Component.extend({
  showStops: Ember.computed('itinerary.stops', function() {
    return this.get('itinerary.stops') > 0;
  }),
  actions: {
    itemHovered(itinerary) {
      this.get('itemHovered')(itinerary);
    },
    itemClicked(itinerary) {
      this.get('itemClicked')(itinerary);
    }
  }
});
