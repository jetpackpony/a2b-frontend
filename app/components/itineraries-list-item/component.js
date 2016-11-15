import Ember from 'ember';

export default Ember.Component.extend({
  expanded: false,
  itinerary: null,
  routeHovered: null,
  routeOpened: null,

  actions: {
    routeHovered(route) {
      if (route !== this.get('routeHovered')) {
        this.set('routeHovered', route);
        this.$('.route-item').removeClass('highlighted');
        this.$(`#route-${route.id}`).addClass('highlighted');
      }
    },
    routeClicked(route) {
      this.set('routeHovered', route);
      this.set('routeOpened', route);
    }
  }
});
