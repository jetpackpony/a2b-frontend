import Ember from 'ember';

export default Ember.Component.extend({
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
    let loc = this.get('location');
    if (loc.country && loc.city) {
      let addr = geocodes.find((item) => item.types.includes('route'))
        || geocodes.find((item) => item.types.includes('street_address'));
      if (addr) {
        addr.geometry.location.lat = function() { return point[0]; }
        addr.geometry.location.lng = function() { return point[1]; }
        Ember.set(loc, 'address', addr);
      } else {
        console.log("Couldn't find geocode", geocodes);
      }
    }
  },

  countries: Ember.A([
    { text: "Vietnam", value: "vn" },
    { text: "Cambodia", value: "kh" },
    { text: "Laos", value: "la" },
    { text: "Myanmar", value: "mm" },
    { text: "Thailand", value: "th" },
    { text: "Malaysia", value: "my" },
    { text: "Brunei", value: "bn" },
    { text: "East Timor", value: "tl" },
    { text: "Indonesia", value: "id" },
    { text: "Singapore", value: "sg" },
    { text: "Philippines", value: "ph" }
  ]),
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
