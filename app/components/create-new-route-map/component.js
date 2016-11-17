import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['create-new-map'],
  gMap: Ember.inject.service(),
  lat: 18,
  lng: 100,
  zoom: 4,
  markers: Ember.A([]),
  polylines: Ember.A([]),
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
    this.reset();
  },
  reset() {
    this.set('markers', Ember.A([]));
    this.set('polylines', Ember.A([]));
    this.set('mapFocusObject', null);
    this.set('fromAddressObject', null);
    this.set('toAddressObject', null);
    this.set('lat', 18);
    this.set('lng', 100);
    this.set('zoom', 4);
  },
  focusChanged: Ember.observer('mapFocusObject', function() {
    if (!this.get('mapFocusObject')) {
      return;
    }
    this._fitMapToBounds(this.get('mapFocusObject').geometry.viewport);
  }),
  fromAddressChanged: Ember.observer('fromAddressObject', function() {
    this._addMarker(0, {
      lat: this.get('fromAddressObject').geometry.location.lat(),
      lng: this.get('fromAddressObject').geometry.location.lng()
    });
    this._centerAtMarker(0);
  }),
  toAddressChanged: Ember.observer('toAddressObject', function() {
    this._addMarker(1, {
      lat: this.get('toAddressObject').geometry.location.lat(),
      lng: this.get('toAddressObject').geometry.location.lng()
    });
    this._centerAtMarker(1);
  }),
  formPositionChanged: Ember.observer('formPosition', function() {
    switch(this.get('formPosition')) {
      case 'from':
        this._centerAtMarker(0);
        break;
      case 'to':
        if (!this._centerAtMarker(1)) {
          this._centerAtMarker(0);
        }
        break;
      case 'details':
        let bounds = this._createBoundsFor(this.get('markers'));
        this._fitMapToBounds(bounds);
        break;
    }
  }),
  markersChanged: Ember.observer('markers.[]', function() {
    if (this.get('markers').length > 1) {
      this._updateLines();
    }
  }),
  actions: {
    mapClicked(e) {
      let point = {
        id: '1',
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      if (this.get('formPosition') === "from") {
        this._updateAddressParams('fromAddress', 'fromCoords', point);
        this._addMarker(0, point);
      } else if (this.get('formPosition') === "to") {
        this._updateAddressParams('toAddress', 'toCoords', point);
        this._addMarker(1, point);
      }
    },
    mapLoaded() {
      this.get('gMap').maps.select('my-map')
        .map.setOptions({ draggableCursor: 'cell' });
    }
  },

  _updateLines() {
    this.set('polylines', Ember.A([]));
    let from = this.get('fromCoords').split(', ').map(parseFloat);
    let to = this.get('toCoords').split(', ').map(parseFloat);
    this.get('polylines').pushObject(this.get('_makeLine')(from, to));
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
  _fitMapToBounds(bounds) {
    this.get('gMap').maps.select('my-map').map.fitBounds(bounds);
  },
  _createBoundsFor(coords) {
    let bounds = new google.maps.LatLngBounds();
    coords.forEach((m) => {
      bounds.extend(new google.maps.LatLng(m.lat, m.lng));
    });
    return bounds;
  },
  _addMarker(id, point) {
    if (this.get('markers').length < id + 1) {
      this.get('markers').pushObject(point);
    } else {
      let markers = Ember.A([]);
      this.get('markers').forEach((item, index) => {
        if (index === id) {
          markers.pushObject(point);
        } else {
          markers.pushObject(item);
        }
      });
      this.set('markers', markers);
    }
  },
  _updateAddressParams(addr, coords, point) {
    this.set(coords, `${point.lat}, ${point.lng}`);
    this.get('gMap')
      .geocode({lat: point.lat, lng: point.lng})
      .then((geocodes) => {
        let address = geocodes[0] ? geocodes[0].formatted_address : "No Address";
        this.set(addr, address);
      })
    .catch((err) => {
      console.error(err);
      this.set(addr, "--error--");
    });
  },
  _centerAtMarker(id) {
    let marker = this.get('markers').objectAt(id);
    if (marker) {
      this.set('lat', marker.lat);
      this.set('lng', marker.lng);
      this.set('zoom', 14);
      return true;
    } else {
      return false;
    }
  }
});
