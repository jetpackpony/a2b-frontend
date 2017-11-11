import Ember from 'ember';

export default Ember.Component.extend({
  routeHovered: null,
  selectedItinerary: null,
  itineraries: Ember.A([]),
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
  markers: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    return Ember.A(this.get('itineraries')
      .reduce((markers, iti) => markers.concat(iti.get('routes')
        .reduce((mrks, route) => mrks.concat([
          {
            id: `${route.get('id')}-from`,
            coords: [route.get('fromLat'), route.get('fromLng')],
            style: this._getLineStyle(iti.get('id'), route.get('id')),
            title: route.get('fromAddress')
          },
          {
            id: `${route.get('id')}-to`,
            coords: [route.get('toLat'), route.get('toLng')],
            style: this._getLineStyle(iti.get('id'), route.get('id')),
            title: route.get('toAddress')
          }
        ]), [])
      ), [])
    );
  }),
  lines: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    let lines = Ember.A([]);
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').forEach((route) => {
        let line = {
          id: route.get('id'),
          from: [route.get('fromLat'), route.get('fromLng')],
          to: [route.get('toLat'), route.get('toLng')]
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
  _getLineStyle(itiId, routeId) {
    if (this._isRouteSelected(routeId)) {
      return 'selected';
    }
    if (this._isItinerarySelected(itiId)) {
      return 'normal';
    }
    return 'dimmed';
  },
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
