import Ember from 'ember';

export default Ember.Mixin.create({
  mapClicked(point) {
    this.get('gMap')
      .geocode({
        lat: point[0],
        lng: point[1],
        language: 'en'
      })
      .then((geocodes) => {
        this.onMapClicked(geocodes, point);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  _getGeocodeItem(geocodes, itemName) {
    return geocodes.find((item) => item.types.includes(itemName));
  },
  _getAddressFromGeocodes(geocodes, point) {
    let addr = this._getGeocodeItem(geocodes, 'route')
      || this._getGeocodeItem(geocodes, 'street_address');
    if (addr && addr.geometry) {
      addr.geometry.location.lat = function() { return point[0]; }
      addr.geometry.location.lng = function() { return point[1]; }
    }
    return addr;
  }
});
