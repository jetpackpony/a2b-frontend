import Ember from 'ember';

export default Ember.Component.extend({
  lat: 32.75494243654723,
  lng: -86.8359375,
  zoom: 4,
  onItineraryChange: Ember.observer('selectedItinerary', function() {
    this.set('polylines', Ember.A([]));
    this.get('selectedItinerary').get('routes').map((item) => {
      let from = item.get('fromCoords').split(', ').map(parseFloat);
      let to = item.get('toCoords').split(', ').map(parseFloat);
      this.get('polylines').pushObject(this.get('makeLine')(from, to));
    });
  }),
  makeLine(from, to) {
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
