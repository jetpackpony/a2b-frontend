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
        console.log('city changed: ', obj);
      }
    },
    next() {
      this.attrs.next();
    }
  }
});
