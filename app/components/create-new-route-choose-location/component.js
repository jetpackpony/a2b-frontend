import Ember from 'ember';
import MapClickHandlerMixin from 'a2b/mixins/map-click-handler';

export default Ember.Component.extend(MapClickHandlerMixin, {
  gMap: Ember.inject.service(),
  countryRestriction: null,
  showAddress: true,
  location: null,
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  reset() {
    this.$('#country').val("");
    this.resetCity();
  },
  resetCity() {
    this.set('countryRestriction', null);
    this.set('location.city', null);
    this.set('_cityValue', '');
    this.resetAddress();
  },
  resetAddress() {
    this.set('location.address', null);
    this.set('_addressValue', '');
    this.set('location.comment', null);
    this.set('showAddress', true);
  },

  countrySet: Ember.computed.bool('countryRestriction'),
  citySet: Ember.computed('location.city', function() {
    let city = this.get('location.city');
    if (city && city.formatted_address) {
      this.set('_cityValue', city.formatted_address);
      return true;
    }
    return false;
  }),
  addressSet: Ember.computed('location.{address,comment}', function() {
    let addr = this.get('location.address');
    let comment = this.get('location.comment');
    if (addr && addr.formatted_address) {
      this.set('_addressValue', addr.formatted_address);
      return true;
    }
    if (comment) {
      return true;
    }
    return false;
  }),

  onMapClicked(geocodes, point) {
    let loc = this.get('location');
    if (loc.country && loc.city) {
      this.set('location.address', this._getAddressFromGeocodes(geocodes, point));
    }
  },

  actions: {
    countryChanged() {
      let code = event.target.value;
      let name = this.get('countries').find((item) => item.value === code).text;

      this.resetCity();
      this.get('gMap')
        .geocode({ address: name })
        .then((geocodes) => {
          this.set('location.country', geocodes[0]);
          this.set('countryRestriction', { country: code });
        })
        .catch((err) => console.error(err));
    },
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('location.city', obj);
        this.resetAddress();
      }
    },
    addressChanged(obj) {
      this.set('location.address', obj);
    },

    toggleAddress() {
      this.set('showAddress', !this.get('showAddress'));
    },
    next() {
      this.get('next')();
    },
    back() {
      this.get('back')();
    }
  }
});
