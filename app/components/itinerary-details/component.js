import Ember from 'ember';

export default Ember.Component.extend({
  itinerary: null,
  routeHovered: null,
  routeOpened: null,

  actions: {
    routeHovered(route) {
      this.set('routeHovered', route);
    },
    routeClicked(route) {
      this.set('routeHovered', route);
      this.set('routeOpened', route);
    }
  }
});
