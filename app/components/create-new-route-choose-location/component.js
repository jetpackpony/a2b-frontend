import Ember from 'ember';

export default Ember.Component.extend({
  location: null,
  showAddress: true,

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
  countryRestriction: Ember.computed('location.country', function() {
    return {
      country: this.get('location.country').address_components[0].short_name
    };
  }),

  onCityChanged: Ember.observer('location.city', function() {
    this.set('location.address', null);
    this.set('location.comment', null);
    this.set('showAddress', true);
  }),

  actions: {
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('location.city', obj);
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
