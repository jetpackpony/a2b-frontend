import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search(queryParams) {
      this.transitionToRoute('itineraries', { queryParams });
    }
  }
});
