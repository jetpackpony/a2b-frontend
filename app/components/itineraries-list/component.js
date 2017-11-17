import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['itineraries-list'],

  selectedItinerary:null,
  didRender() {
    if (this.get('selectedItinerary')) {
      this.selectItinerary(this.get('selectedItinerary'));
    }
  },
  actions: {
    itemHovered(itinerary) {
      if (itinerary !== this.get('selectedItinerary')) {
        this.set('selectedItinerary', itinerary);
        this.selectItinerary(itinerary);
      }
    },
    itemClicked(itinerary) {
      this.set('selectedItinerary', itinerary);
      this.set('openedItinerary', itinerary);
    }
  },
  selectItinerary(itinerary) {
    this.$('.itinerary-list-item').removeClass('highlighted');
    this.$(`#itinerary-${itinerary.id}`).addClass('highlighted');
  }
});
