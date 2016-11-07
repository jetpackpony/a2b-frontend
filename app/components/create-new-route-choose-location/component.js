import Ember from 'ember';

export default Ember.Component.extend({
  countryRestriction: null,
  countries: [
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
  ],
  actions: {
    countryChanged() {
      this.set('countryRestriction', { country: event.target.value });
    },
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('city', obj.formatted_address);
        this.set('cityObject', obj);
      }
    },
    addressChanged(obj) {
      let coords = `${obj.geometry.location.lat()}, ${obj.geometry.location.lng()}`;
      this.set('coords', coords);
      this.set('addressObject', obj);
    },
    next() {
      this.attrs.next();
    }
  }
});
