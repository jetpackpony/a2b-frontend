import Ember from 'ember';

export default Ember.Component.extend({
  routeHovered: null,
  selectedItinerary: null,
  itineraries: Ember.A([]),
  markers: Ember.A([]),
  bounds: Ember.computed('itineraries.[]', function() {
    let bounds = Ember.A([]);
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').map((route) => {
        bounds.pushObject([route.get('fromLat'), route.get('fromLng')].map(parseFloat));
        bounds.pushObject([route.get('toLat'), route.get('toLng')].map(parseFloat));
      });
    });
    return bounds;
  }),
  lines: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    let lines = Ember.A([]);
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').forEach((route) => {
        let line = {
          id: route.get('id'),
          from: [route.get('fromLat'), route.get('fromLng')],
          to: [route.get('toLat'), route.get('toLng')],
          markers: {
            titles: {
              from: route.get('fromAddress'),
              to: route.get('toAddress')
            }
          }
        };

        if (this._isRouteSelected(route.get('id'))) {
          line.style = 'selected';
        } else if (this._isItinerarySelected(iti.get('id'))) {
          line.style = 'normal';
        } else {
          line.style = 'dimmed';
        }
        lines.pushObject(line);
      });
    });
    return lines;
  }),
  _isItinerarySelected(id) {
    if (!this.get('selectedItinerary')) {
      return false;
    }
    if (this.get('selectedItinerary').get('id') !== id) {
      return false;
    }
    return true;
  },
  _isRouteSelected(id) {
    if (!this.get('routeHovered')) {
      return false;
    }
    if (this.get('routeHovered').get('id') !== id) {
      return false;
    }
    return true;
  },
});
