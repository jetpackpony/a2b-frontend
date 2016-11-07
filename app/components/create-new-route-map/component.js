import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  lat: 18,
  lng: 100,
  zoom: 4,
  _fitMapToBounds(bounds) {
    this.get('gMap').maps.select('my-map').map.fitBounds(bounds);
  },
  fromCityChanged: Ember.observer('fromCityObject', function() {
    this._fitMapToBounds(this.get('fromCityObject').geometry.viewport);
  }),
  toCityChanged: Ember.observer('toCityObject', function() {
    this._fitMapToBounds(this.get('toCityObject').geometry.viewport);
  }),
  formPositionChanged: Ember.observer('formPosition', function() {
    if (this.get('formPosition') === 'details') {
      let bounds = new google.maps.LatLngBounds();
      this.get('markers').forEach((m) => {
        bounds.extend(new google.maps.LatLng(m.lat, m.lng));
      });
      this._fitMapToBounds(bounds);
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
        let prev = this.get('markers').objectAt(1);
        let markers = Ember.A();
        markers.pushObject(point);
        if (prev !== undefined) {
          markers.pushObject(prev);
        }

        this.set('markers', markers);
        this._updateAddressParams('fromAddress', 'fromCoords', point);
      } else if (this.get('formPosition') === "to") {
        let prev = this.get('markers').objectAt(0);
        let markers = Ember.A();
        if (prev !== undefined) {
          markers.pushObject(prev);
        }
        markers.pushObject(point);

        this.set('markers', markers);
        this._updateAddressParams('toAddress', 'toCoords', point);
      }
    }
  },
  markers: Ember.A([ ]),

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
  }
});
