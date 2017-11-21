import Ember from 'ember';

export default Ember.Component.extend({
  itinerarySelected: Ember.computed('selectedItinerary', 'itinerary', function() {
    return this.get('itinerary.id') === this.get('selectedItinerary.id');
  })
});
