import Ember from 'ember';

export default Ember.Mixin.create({
  showSpinner: false,
  actions: {
    search(params) {
      this.set('showSpinner', true);
      this.transitionToRoute('itineraries', {
        queryParams: {
          fromId: params.fromLocation.get('id'),
          fromCity: params.fromLocation.get('name'),
          toId: params.toLocation.get('id'),
          toCity: params.toLocation.get('name')
        }
      }).then(() => {
        this.set('showSpinner', false);
      });
    }
  }
});
