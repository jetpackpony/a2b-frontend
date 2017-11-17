import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['itineraries-list'],

  selectedItinerary:null,
  openedItinerary: null,
  actions: {
    itemHovered(itinerary) {
      this.set('selectedItinerary', itinerary);
    },
    itemClicked(itinerary) {
      this.set('selectedItinerary', itinerary);
      this.set('openedItinerary', itinerary);
    }
  }
});
