import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemHovered(itinerary) {
      // Change the class on item itself - set the binding
      this.get('itemHovered')(itinerary);
    }
  }
});
