import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['display-itineraries'],

  selectedItinerary: Ember.computed('itineraries', function() {
    return this.get('itineraries').get('firstObject');
  }),

  openedItinerary: null,
  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      this.$('.itinerary-details-container').removeClass('hidden');

      // If there is only one route, open it directly
      if (iti.get('routes').get('length') === 1) {
        this.set('routeHovered', iti.get('routes').get('firstObject'));
        this.set('routeOpened', iti.get('routes').get('firstObject'));
      }
    } else {
      this.$('.itinerary-details-container').addClass('hidden');
    }
  }),

  routeHovered: null,
  routeOpened: null,
  routeOpenedChanged: Ember.observer('routeOpened', function() {
    let route = this.get('routeOpened');
    if (route !== null) {
      this.$('.rotue-details-container').removeClass('hidden');
    } else {
      this.$('.rotue-details-container').addClass('hidden');
    }
  }),
  actions: {
    closeItinerary() {
      this.set('openedItinerary', null);
      this.set('routeHovered', null);
    },
    closeRoute() {
      let iti = this.get('openedItinerary');
      if (iti.get('routes').get('length') === 1) {
        this.set('openedItinerary', null);
      }
      this.set('routeHovered', null);
      this.set('routeOpened', null);
    }
  }
});
