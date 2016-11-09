import Ember from 'ember';

export default Ember.Component.extend({
  openedItinerary: null,
  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      console.log("show the side-slider");
    } else {
      console.log("hide the side-slider");
    }
  }),
  selectedItinerary: Ember.computed('itineraries', function() {
    return this.get('itineraries').get('firstObject');
  })
});
