import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['display-itineraries'],
  openedItinerary: null,
  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      this.$('.itinerary-details-container').removeClass('hidden');
    } else {
      this.$('.itinerary-details-container').addClass('hidden');
    }
  }),
  selectedItinerary: Ember.computed('itineraries', function() {
    return this.get('itineraries').get('firstObject');
  }),

  routeHovered: null,
  routeOpened: null,

  actions: {
    closeItinerary() {
      this.set('openedItinerary', null);
      this.set('routeHovered', null);
    }
  }
});
