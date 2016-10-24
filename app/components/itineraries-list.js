import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemHovered(itinerary) {
      if (itinerary !== this.get('selectedItinerary')) {
        // Change classes on all other itineraries - unselect them
        console.log("(list) item hovered", itinerary);
        this.set('selectedItinerary', itinerary);
      }
    }
  }
});
