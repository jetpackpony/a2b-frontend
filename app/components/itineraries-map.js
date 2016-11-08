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
  polylines: Ember.computed('selectedItinerary', 'itineraries', function() {
    let lines = Ember.A([]);
    let selected = this.get('selectedItinerary').get('id');
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').forEach((route) => {
        let from = route.get('fromCoords').split(', ').map(parseFloat);
        let to = route.get('toCoords').split(', ').map(parseFloat);
        if (selected === iti.get('id')) {
          lines.pushObject(this._makeLineSelected(from, to));
        } else {
          lines.pushObject(this._makeLine(from, to));
        }
      });
    });
    return lines;
  }),
  actions: {
    mapLoaded() {
      this.get('gMap').maps.select('my-map').
        map.fitBounds(this.get('bounds'));
    }
  },
  _line(from, to) {
    return {
          id: `${from} -> ${to}`,
          path: [ from, to ],
          clickable: true,
          editable: false,
          geodesic: true,
          strokeColor: 'blue',
          strokeOpacity: 1,
          strokeWeight: 3,
          visible: true,
          zIndex: 999
        };
  },
  _makeLine(from, to) {
    let line = this._line(from, to);
    line.strokeColor = 'grey';
    line.strokeOpacity = 0.7;
    line.strokeWeight = 3;
    return line;
  },
  _makeLineSelected(from, to) {
    let line = this._line(from, to);
    line.strokeColor = '#2c9bba';
    line.strokeOpacity = 1;
    line.strokeWeight = 5;
    return line;
  }
});
