import Ember from 'ember';

export default Ember.Component.extend({
  gMap: Ember.inject.service(),
  countryRestriction: null,
  mapFocusObject: null,
  showAddress: true,
  countrySet: Ember.computed('countryRestriction', function() {
    return this.get('countryRestriction') !== null;
  }),
  citySet: Ember.computed('city', function() {
    return !!this.get('city');
  }),
  addressSet: Ember.computed('coords', 'comment', function() {
    return !!this.get('coords') || !!this.get('comment');
  }),
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

      this.set('countryRestriction', null);
      this.set('city', null);
      this.set('coords', null);
      this.set('address', null);
      this.set('addressObject', null);
      this.get('gMap')
        .geocode({ address: name })
        .then((geocodes) => {
          this.set('mapFocusObject', geocodes[0]);
          this.set('countryRestriction', { country: code });
        })
        .catch((err) => console.error(err));
    },
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('city', obj.formatted_address);
        this.set('mapFocusObject', obj);
      }
    },
    addressChanged(obj) {
      console.log("choose location > address changed: ", obj);
      let coords = `${obj.geometry.location.lat()}, ${obj.geometry.location.lng()}`;
      this.set('coords', coords);
      this.set('addressObject', obj);
    },
    toggleAddress() {
      this.set('showAddress', !this.get('showAddress'));
    },
    next() {
      this.attrs.next();
    }
  }
});
