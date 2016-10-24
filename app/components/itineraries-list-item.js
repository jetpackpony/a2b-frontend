import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemHovered(itinerary) {
      // Change the class on item itself - set the binding
      console.log("(list-item) item hovered", itinerary);
      this.get('itemHovered')(itinerary);
    }
  }
});
