import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  lat: 32.75494243654723,
  lng: -86.8359375,
  zoom: 4,
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
        if (prev !== undefined) markers.pushObject(prev);

        this.set('markers', markers);
        this._updateAddressParams('fromAddress', 'fromCoords', point);
      } else if (this.get('formPosition') === "to") {
        let prev = this.get('markers').objectAt(0);
        let markers = Ember.A();
        if (prev !== undefined) markers.pushObject(prev);
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
