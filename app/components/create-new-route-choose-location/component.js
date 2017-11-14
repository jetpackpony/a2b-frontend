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
    this.set('location.country', null);
    this.set('location.city', null);
    this.resetAddress();
  },
  resetAddress() {
    this.set('location.address', null);
    this.set('location.comment', null);
    this.set('showAddress', true);
  },

  isCountrySet: Ember.computed('location.country', function() {
    let country = this.get('location.country');
    return (country && country.formatted_address);
  }),
  isCitySet: Ember.computed('location.city', function() {
    let city = this.get('location.city');
    return (city && city.formatted_address);
  }),
  isAddressSet: Ember.computed('location.{address,comment}', function() {
    let addr = this.get('location.address');
    let comment = this.get('location.comment');
    return (addr && addr.formatted_address) || comment;
  }),

  cityText: Ember.computed('location.city', {
    get(key) {
      let city = this.get('location.city');
      return (city && city.formatted_address)
        ? city.formatted_address
        : '';
    },
    set(key, value) {
      return value;
    }
  }),
  addressText: Ember.computed('location.address', {
    get(key) {
      let address = this.get('location.address');
      return (address && address.formatted_address)
        ? address.formatted_address
        : '';
    },
    set(key, value) {
      return value;
    }
  }),


  onMapClicked(geocodes, point) {
    let loc = this.get('location');
    if (loc.country && loc.city) {
      this.set('location.address', this._getAddressFromGeocodes(geocodes, point));
    }
  },

  actions: {
    countryChanged(code) {
      this.get('gMap')
        .geocode({
          address: this.get('countries').find(
            (item) => item.value === code
          ).text
        })
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
