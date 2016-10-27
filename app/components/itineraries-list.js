import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemHovered(itinerary) {
      if (itinerary !== this.get('selectedItinerary')) {
        // Change classes on all other itineraries - unselect them
        this.set('selectedItinerary', itinerary);
      }
    }
  }
});
