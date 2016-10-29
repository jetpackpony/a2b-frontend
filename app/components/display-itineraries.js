import Ember from 'ember';

export default Ember.Component.extend({
  selectedItinerary: Ember.computed('itineraries', function() {
    return this.get('itineraries').get('firstObject');
  })
});
