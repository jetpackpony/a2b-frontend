import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createRoute(route) {
      // Bubble the event up
      this.attrs.createRoute(route);
    }
  }
});
