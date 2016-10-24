import Ember from 'ember';

export default Ember.Component.extend({
  onItineraryChange: Ember.observer('selectedItinerary', function() {
    console.log("(map) item hovered", this.get('selectedItinerary'));
  })
});
