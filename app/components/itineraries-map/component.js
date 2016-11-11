import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  lat: 15,
  lng: 100,
  zoom: 4,
  routeHovered: null,
  selectedItinerary: null,
  itineraries: Ember.A([]),
  mapLoaded: false,
  itinerariesChanged: Ember.observer('itineraries', function() {
    if (this.get('mapLoaded')) {
      this._setMapToBounds();
    }
  }),
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
  polylines: Ember.computed('selectedItinerary', 'itineraries', 'routeHovered', function() {
    let lines = Ember.A([]);
    let markers = Ember.A([]);
    this.get('itineraries').forEach((iti) => {
      iti.get('routes').forEach((route) => {
        let from = route.get('fromCoords').split(', ').map(parseFloat);
        let to = route.get('toCoords').split(', ').map(parseFloat);

        if (this._isRouteSelected(route.get('id'))) {
          lines.pushObject(this._makeLineHighlighted(from, to));
          markers.pushObject(this._makeMarkerHighlighted(from, route.get('fromAddress')));
          markers.pushObject(this._makeMarkerHighlighted(to, route.get('toAddress')));
        } else if (this._isItinerarySelected(iti.get('id'))) {
          lines.pushObject(this._makeLineSelected(from, to));
          markers.pushObject(this._makeMarkerSelected(from, route.get('fromAddress')));
          markers.pushObject(this._makeMarkerSelected(to, route.get('toAddress')));
        } else {
          lines.pushObject(this._makeLine(from, to));
          markers.pushObject(this._makeMarker(from, route.get('fromAddress')));
          markers.pushObject(this._makeMarker(to, route.get('toAddress')));
        }
      });
    });
    this.set('markers', markers);
    return lines;
  }),
  markers: Ember.A([]),
  actions: {
    mapLoaded() {
      this.set('mapLoaded', true);
      this._setMapToBounds();
    }
  },
  _setMapToBounds() {
    let bounds = this.get('bounds');
    if (!bounds.isEmpty()) {
      this.get('gMap').maps.select('my-map').map.fitBounds(bounds);
    }
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
      zIndex: 1
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
    line.zIndex = 3;
    return line;
  },
  _makeLineHighlighted(from, to) {
    let line = this._line(from, to);
    line.strokeColor = '#f94572';
    line.strokeOpacity = 1;
    line.strokeWeight = 5;
    line.zIndex = 5;
    return line;
  },
  _marker(point, text) {
    return {
      id: point,
      lat: point[0],
      lng: point[1],
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        strokeColor: 'grey',
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: "white",
        fillOpacity: 1
      },
      infoWindow: { content: text },
      zIndex: 2
    };
  },
  _makeMarker(point, text) {
    let marker = this._marker(point, text);
    return marker;
  },
  _makeMarkerSelected(point, text) {
    let marker = this._marker(point, text);
    marker.icon.strokeColor = '#2c9bba';
    marker.icon.strokeOpacity = 1;
    marker.icon.scale = 7;
    marker.zIndex = 4;
    return marker;
  },
  _makeMarkerHighlighted(point, text) {
    let marker = this._marker(point, text);
    marker.icon.strokeColor = '#f94572';
    marker.icon.strokeOpacity = 1;
    marker.icon.scale = 7;
    marker.zIndex = 6;
    return marker;
  }
});
