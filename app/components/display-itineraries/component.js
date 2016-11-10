import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['display-itineraries'],
  itineraries: Ember.A([]),
  selectedItinerary: null,
  openedItinerary: null,
  routeHovered: null,
  routeOpened: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('openedItinerary', null);
    this.set('routeHovered', null);
    this.set('routeOpened', null);
    this.set('selectedItinerary', this.get('itineraries').get('firstObject'));
  },
  _slideInLeft(el) {
    el.animate({ left: 0 }, 300);
  },
  _slideOutLeft(el) {
    el.animate({ left: "-33.33333%" }, 300);
  },

  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      this._slideInLeft(this.$('.itinerary-details-container'));

      // If there is only one route, open it directly
      if (iti.get('routes').get('length') === 1) {
        this.set('routeHovered', iti.get('routes').get('firstObject'));
        this.set('routeOpened', iti.get('routes').get('firstObject'));
      }
    } else {
      this._slideOutLeft(this.$('.itinerary-details-container'));
    }
  }),

  routeOpenedChanged: Ember.observer('routeOpened', function() {
    let route = this.get('routeOpened');
    if (route !== null) {
      this._slideInLeft(this.$('.rotue-details-container'));
    } else {
      this._slideOutLeft(this.$('.rotue-details-container'));
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
