import Ember from 'ember';

export default Ember.Component.extend({
  showStops: Ember.computed('itinerary.stops', function() {
    return this.get('itinerary.stops') > 0;
  }),
  actions: {
    itemHovered(itinerary) {
      // Change the class on item itself - set the binding
      this.get('itemHovered')(itinerary);
    }
  }
});
