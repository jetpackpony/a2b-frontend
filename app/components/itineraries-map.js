import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  lat: 15,
  lng: 100,
  zoom: 4,
  bounds: Ember.computed('itineraries', function() {
    let bounds = new google.maps.LatLngBounds();
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').map((route) => {
        let from = route.get('fromCoords').split(', ').map(parseFloat);
        let to = route.get('toCoords').split(', ').map(parseFloat);
        bounds.extend(new google.maps.LatLng(from[0], from[1]));
        bounds.extend(new google.maps.LatLng(to[0], to[1]));
      })
    });
    return bounds;
  }),
  polylines: Ember.computed('selectedItinerary', function() {
    return this.get('selectedItinerary').get('routes').map((item) => {
      let from = item.get('fromCoords').split(', ').map(parseFloat);
      let to = item.get('toCoords').split(', ').map(parseFloat);
      return this.get('_makeLine')(from, to);
    });
  }),
  actions: {
    mapLoaded() {
      this.get('gMap').maps.select('my-map').
        map.fitBounds(this.get('bounds'));
    }
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
  }
});
