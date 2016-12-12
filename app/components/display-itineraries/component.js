import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row','bottom-split'],
  itineraries: Ember.A([]),
  selectedItinerary: null,
  openedItinerary: null,
  routeHovered: null,
  routeOpened: null,
  showDirectOnly: true,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('openedItinerary', null);
    this.set('routeHovered', null);
    this.set('routeOpened', null);
    this.set('selectedItinerary', this.get('itineraries').get('firstObject'));
  },

  visibleItineraries: Ember.computed.filter('itineraries', function(iti) {
    return iti.get('stops') === 0 || !this.get('showDirectOnly');
  }),

  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      this.$('#itinerary-details').removeClass('hidden');

      // If there is only one route, open it directly
      if (iti.get('routes').get('length') === 1) {
        this.set('routeHovered', iti.get('routes').get('firstObject'));
        this.set('routeOpened', iti.get('routes').get('firstObject'));
      }
    } else {
      this.$('#itinerary-details').addClass('hidden');
    }
  }),

  routeOpenedChanged: Ember.observer('routeOpened', function() {
    let route = this.get('routeOpened');
    if (route !== null) {
      this.$('#route-details').removeClass('hidden');
    } else {
      this.$('#route-details').addClass('hidden');
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
