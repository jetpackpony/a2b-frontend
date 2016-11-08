import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  lat: 15,
  lng: 100,
  zoom: 4,
  init() {
    this._super(...arguments);
    this._redrawLines();
  },
  onItineraryChange: Ember.observer('selectedItinerary', function() {
    this._redrawLines();
    this._boundsToSelectedItinerary();
  }),
  actions: {
    mapLoaded() {
      this._boundsToSelectedItinerary();
    }
  },
  _boundsToSelectedItinerary() {
    let coords = [];
    this.get('selectedItinerary').get('routes').map((item) => {
      let from = item.get('fromCoords').split(', ').map(parseFloat);
      let to = item.get('toCoords').split(', ').map(parseFloat);
      coords.push({ lat: from[0], lng: from[1] });
      coords.push({ lat: to[0], lng: to[1] });
    });
    this.get('gMap').maps.select('my-map').
      map.fitBounds(this._createBoundsFor(coords));
  },
  _createBoundsFor(coords) {
    let bounds = new google.maps.LatLngBounds();
    coords.forEach((m) => {
      bounds.extend(new google.maps.LatLng(m.lat, m.lng));
    });
    return bounds;
  },
  _redrawLines() {
    this.set('polylines', Ember.A([]));
    this.get('selectedItinerary').get('routes').map((item) => {
      let from = item.get('fromCoords').split(', ').map(parseFloat);
      let to = item.get('toCoords').split(', ').map(parseFloat);
      this.get('polylines').pushObject(this.get('_makeLine')(from, to));
    });
  },
  _makeLine(from, to) {
    return {
          id: `${from} -> ${to}`,
          path: [ from, to ],
          clickable: true,
          editable: false,
          geodesic: true,
          icons: [{
            icon: {
              path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
            },
            offset: '100%'
          }],
          strokeColor: 'blue',
          strokeOpacity: 1,
          strokeWeight: 3,
          visible: true,
          zIndex: 999
        };
  },
  polylines: Ember.A([])
});
