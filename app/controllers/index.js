import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search(params) {
      this.transitionToRoute('itineraries', {
        queryParams: {
          fromId: params.fromLocation.get('id'),
          fromCity: params.fromLocation.get('name'),
          toId: params.toLocation.get('id'),
          toCity: params.toLocation.get('name')
        }
      });
    }
  }
});
