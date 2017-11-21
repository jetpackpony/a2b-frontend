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
  visibleItineraries: Ember.computed('itineraries', 'showDirectOnly', function() {
    return (this.get('showDirectOnly'))
      ? this.get('itineraries').filter(isItineraryDirect)
      : this.get('itineraries');
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('openedItinerary', null);
    this.set('routeHovered', null);
    this.set('routeOpened', null);
    this.set('selectedItinerary',
      this.get('itineraries').get('firstObject'));
    this.set('showDirectOnly',
      isAnyDirectItineraries(this.get('itineraries')));
  },

  didInsertElement() {
    if (this.get('media.isMobile')) {
      this.prepareForMobile();
    }
  },

  onOpenedItineraryChange: Ember.observer('openedItinerary', function() {
    let itinerary = this.get('openedItinerary');
    if (itinerary !== null) {
      this.showItineraryDetails();
      // If there is only one route, show it right away
      if (isItineraryDirect(itinerary)) {
        this.set('routeHovered', getFirstRoute(itinerary));
        this.set('routeOpened', getFirstRoute(itinerary));
      }
      if (this.get('media.isMobile')) {
        this.hideMobileOverlay();
      }
    } else {
      if (this.get('media.isMobile')) {
        this.showMobileOverlay();
      }
      this.hideItineraryDetails();
    }
  }),
  onRouteOpenedChange: Ember.observer('routeOpened', function() {
    (this.get('routeOpened') !== null)
      ? this.showRouteDetails()
      : this.hideRouteDetails();
  }),

  actions: {
    closeItinerary() {
      this.set('openedItinerary', null);
      this.set('routeHovered', null);
    },
    closeRoute() {
      this.set('routeHovered', null);
      this.set('routeOpened', null);
      // Also close itinerary if it consists of only one route
      if (isItineraryDirect(this.get('openedItinerary'))) {
        this.set('openedItinerary', null);
      }
    },
    toggleDirectOnly() {
      this.toggleProperty('showDirectOnly');
    }
  },

  showItineraryDetails() {
    this.$('#itinerary-details').removeClass('hidden');
  },
  hideItineraryDetails() {
    this.$('#itinerary-details').addClass('hidden');
  },
  showRouteDetails() {
    this.$('#route-details').removeClass('hidden');
  },
  hideRouteDetails() {
    this.$('#route-details').addClass('hidden');
  },
  prepareForMobile() {
    this.$('body').removeClass('noscroll');
  },
  hideMobileOverlay() {
    this.$('.body-shadow').removeClass('hidden');
    this.$('.bottom-single-overlay').removeClass('hidden');
  },
  showMobileOverlay() {
    this.$('.body-shadow').addClass('hidden');
    this.$('.bottom-single-overlay').addClass('hidden');
  }
});

const isItineraryDirect = (itinerary) => (
  itinerary.get('stops') === 0
);

const getFirstRoute = (itinerary) => (
  itinerary.get('routes').get('firstObject')
);

const isAnyDirectItineraries = (itineraries) => (
  itineraries.filter(isItineraryDirect).length !== 0
);
