import Ember from 'ember';
import MapClickHandlerMixin from 'a2b/mixins/map-click-handler';

export default Ember.Component.extend(MapClickHandlerMixin, {
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

  onMapClicked(geocodes, point) {
    let country = this._getGeocodeItem(geocodes, 'country');
    let city = this._getGeocodeItem(geocodes, 'locality');
    this.set('location.country', country || null);
    this.set('location.city', city || null);
    this.set('location.address', this._getAddressFromGeocodes(geocodes, point));
  },

  actions: {
    addressChanged(obj) {
      // When the address is searched, get the coords and
      // make it look like a click on a map
      let point = [obj.geometry.location.lat(), obj.geometry.location.lng()]
      this.mapClicked(point)
    }
  }
});
