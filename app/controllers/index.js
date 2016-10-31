import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search(from_city, to_city) {
      this.transitionToRoute('itineraries', { queryParams: {
        from: from_city,
        to: to_city
      }});
    }
  }
});
