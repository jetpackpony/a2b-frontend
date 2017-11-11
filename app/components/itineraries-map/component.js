import Ember from 'ember';

export default Ember.Component.extend({
  routeHovered: null,
  selectedItinerary: null,
  itineraries: Ember.A([]),
  bounds: Ember.computed('itineraries.[]', function() {
    return Ember.A(
      this.get('itineraries').reduce((bounds, iti) => bounds.concat(
        iti.get('routes').reduce((bnds, route) => bnds.concat([
          [route.get('fromLat'), route.get('fromLng')].map(parseFloat),
          [route.get('toLat'), route.get('toLng')].map(parseFloat)
        ]), [])
      ), [])
    );
  }),
  markers: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    return Ember.A(this.get('itineraries')
      .reduce((markers, iti) => markers.concat(iti.get('routes')
        .reduce((mrks, route) => mrks.concat([
          this._createMarker(iti, route, "from"),
          this._createMarker(iti, route, "to"),
        ]), [])
      ), [])
    );
  }),
  lines: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    return Ember.A(
      this.get('itineraries').reduce((lines, iti) => lines.concat(
        iti.get('routes').map((route) => ({
          id: route.get('id'),
          from: [route.get('fromLat'), route.get('fromLng')],
          to: [route.get('toLat'), route.get('toLng')],
          style: this._getLineStyle(iti.get('id'), route.get('id'))
        }))
      ), [])
    );
  }),
  _getLineStyle(itiId, routeId) {
    if (this._isRouteSelected(routeId)) return 'selected';
    if (this._isItinerarySelected(itiId)) return 'normal';
    return 'dimmed';
  },
  _isItinerarySelected(id) {
    return !(
      !this.get('selectedItinerary')
      || this.get('selectedItinerary').get('id') !== id
    );
  },
  _isRouteSelected(id) {
    return !(
      !this.get('routeHovered')
      || this.get('routeHovered').get('id') !== id
    );
  },
  _createMarker(itinerary, route, prefix) {
    return {
      id: `${route.get('id')}-${prefix}`,
      coords: [route.get(`${prefix}Lat`), route.get(`${prefix}Lng`)],
      style: this._getLineStyle(itinerary.get('id'), route.get('id')),
      title: route.get(`${prefix}Address`)
    };
  },
});
