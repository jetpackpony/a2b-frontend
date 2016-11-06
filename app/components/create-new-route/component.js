import Ember from 'ember';

export default Ember.Component.extend({
  travelCountry: "",
  countries: ["Vietnam","Thailand","Cambodia"],
  currentStep: 2,
  actions: {
    createRoute(route) {
      // Bubble the event up
      this.attrs.createRoute(route);
    },
    next() {
      console.log("route: ", this.get('newRoute'));
      this.incrementProperty('currentStep');
    },
    submit() {
      console.log("complete: ", this.get('newRoute'));
    }
  }
});
