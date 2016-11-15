import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['itineraries-list'],

  selectedItinerary:null,
  didRender() {
    if (this.get('selectedItinerary')) {
      this.$(`#itinerary-${this.get('selectedItinerary').id}`).addClass('highlighted');
    }
  },
  actions: {
    itemHovered(itinerary) {
      if (itinerary !== this.get('selectedItinerary')) {
        this.set('selectedItinerary', itinerary);
        this.$('.itinerary-short').removeClass('highlighted');
        this.$(`#itinerary-${itinerary.id}`).addClass('highlighted');
      }
    },
    itemClicked(itinerary) {
      this.set('selectedItinerary', itinerary);
      this.set('openedItinerary', itinerary);
    }
  }
});
