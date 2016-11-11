import Ember from 'ember';

export default Ember.Component.extend({
  expanded: false,
  itinerary: null,
  routeHovered: null,
  routeOpened: null,
  duration: Ember.computed('itinerary.duration', function() {
    let duration = this.get('itinerary.duration');
    if (duration % 1 === 0) {
      return `${duration - (duration % 1)} hours`;
    } else {
      return `${duration - (duration % 1)}h ${(duration % 1) * 60}m`
    }
  }),

  actions: {
    routeHovered(route) {
      if (route !== this.get('routeHovered')) {
        this.set('routeHovered', route);
        this.$('.route').removeClass('selected');
        this.$(`#route-${route.id}`).addClass('selected');
      }
    },
    routeClicked(route) {
      this.set('routeHovered', route);
      this.set('routeOpened', route);
    }
  }
});
