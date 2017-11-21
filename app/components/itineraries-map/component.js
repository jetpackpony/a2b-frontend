import Ember from 'ember';

export default Ember.Component.extend({
  routeHovered: null,
  selectedItinerary: null,
  itineraries: Ember.A([]),
  bounds: Ember.computed('itineraries.[]', function() {
    return calcBoundsFromItineraries(this.get('itineraries'));
  }),
  markers: Ember.computed('itineraries.[]', 'selectedItinerary', 'routeHovered', function() {
    return Ember.A(this.get('itineraries')
      .reduce((markers, iti) => markers.concat(iti.get('routes')
        .reduce((mrks, route) => mrks.concat([
          this.createMarker(iti, route, "from"),
          this.createMarker(iti, route, "to"),
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
          style: this.getLineStyle(iti, route)
        }))
      ), [])
    );
  }),
  getLineStyle(itinerary, route) {
    return (this.isRouteSelected(route))
      ? 'selected'
      : ((this.isItinerarySelected(itinerary))
        ? 'normal'
        : 'dimmed');
  },
  isItinerarySelected(itinerary) {
    return this.get('selectedItinerary.id') === itinerary.get('id');
  },
  isRouteSelected(route) {
    return this.get('routeHovered.id') === route.get('id');
  },
  createMarker(itinerary, route, prefix) {
    return {
      id: `${route.get('id')}-${prefix}`,
      coords: [route.get(`${prefix}Lat`), route.get(`${prefix}Lng`)],
      style: this.getLineStyle(itinerary, route),
      title: route.get(`${prefix}Address`)
    };
  },
});

const calcBoundsFromItineraries = (itineraries) => (
  Ember.A(
    itineraries.reduce((bounds, iti) => bounds.concat(
      iti.get('routes').reduce((bnds, route) => bnds.concat([
        [route.get('fromLat'), route.get('fromLng')].map(parseFloat),
        [route.get('toLat'), route.get('toLng')].map(parseFloat)
      ]), [])
    ), [])
  )
);
