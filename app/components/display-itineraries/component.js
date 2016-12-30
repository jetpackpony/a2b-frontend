import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  classNameBindings: ['media.isMobile:bottom-single:bottom-split'],
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
    let directCount = this.get('itineraries').filterBy('stops', 0).length;
    this.set('showDirectOnly', directCount !== 0);
  },

  visibleItineraries: Ember.computed('itineraries', 'showDirectOnly', function() {
    return this.get('itineraries').filter((iti) => {
      return iti.get('stops') === 0 || !this.get('showDirectOnly');
    });
  }),

  openedItineraryChanged: Ember.observer('openedItinerary', function() {
    let iti = this.get('openedItinerary');
    if (iti !== null) {
      if (this.get('media.isMobile')) {
        $('body').addClass('noscroll');
        $('.body-shadow').removeClass('hidden');
        $('.bottom-single-overlay').removeClass('hidden');
      }
      this.$('#itinerary-details').removeClass('hidden');

      // If there is only one route, open it directly
      if (iti.get('routes').get('length') === 1) {
        this.set('routeHovered', iti.get('routes').get('firstObject'));
        this.set('routeOpened', iti.get('routes').get('firstObject'));
      }
    } else {
      if (this.get('media.isMobile')) {
        $('body').removeClass('noscroll');
        $('.body-shadow').addClass('hidden');
        $('.bottom-single-overlay').addClass('hidden');
      }
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
    },
    toggleDirectOnly() {
      this.toggleProperty('showDirectOnly');
    }
  }
});
