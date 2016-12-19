import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  location: null,
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  reset() {
    this.set('location.country', null);
    this.set('location.city', null);
    this.set('location.address', null);
    this.set('_addressValue', '');
  },
  onAddressSet: Ember.observer('location.address', function() {
    let addr = this.get('location.address');
    if (addr && addr.formatted_address) {
      this.set('_addressValue', addr.formatted_address);
      return true;
    }
    return false;
  }),

  mapClicked(point) {
    this.get('gMap')
      .geocode({
        lat: point[0],
        lng: point[1],
        language: 'en'
      })
      .then((geocodes) => {
        this._setLocation(geocodes, point);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  _setLocation(geocodes, point) {
    let country = geocodes.find((item) => item.types.includes('country'));
    let city = geocodes.find((item) => item.types.includes('locality'));
    let addr = geocodes.find((item) => item.types.includes('route'))
      || geocodes.find((item) => item.types.includes('street_address'));
    if (addr && addr.geometry) {
      addr.geometry.location.lat = function() { return point[0]; }
      addr.geometry.location.lng = function() { return point[1]; }
    }
    this.set('location.country', country || null);
    this.set('location.city', city || null);
    this.set('location.address', addr);
  },

  actions: {
    addressChanged(obj) {
      // When the address is searched, get the coords and
      // make it look like a click on a map
      this.mapClicked([obj.geometry.location.lat(), obj.geometry.location.lng()])
    }
  }
});
