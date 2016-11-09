import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$(`#itinerary-${this.get('selectedItinerary').id}`).addClass('selected');
  },
  actions: {
    itemHovered(itinerary) {
      if (itinerary !== this.get('selectedItinerary')) {
        this.set('selectedItinerary', itinerary);
        this.$('.itinerary').removeClass('selected');
        this.$(`#itinerary-${itinerary.id}`).addClass('selected');
      }
    },
    itemClicked(itinerary) {
      this.set('selectedItinerary', itinerary);
      this.set('openedItinerary', itinerary);
    }
  }
});
