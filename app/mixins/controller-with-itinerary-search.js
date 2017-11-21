import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Mixin.create({
  showSpinner: false,
  actions: {
    search(params) {
      this.set('showSpinner', true);
      this.transitionToRoute(
        'itineraries',
        composeQueryParams(params)
      )
        .then(() => {
          this.set('showSpinner', false);
        });
    }
  }
});

const composeQueryParams = (params) => ({
  queryParams: {
    fromId: params.fromLocation.get('id'),
    fromCity: params.fromLocation.get('name'),
    toId: params.toLocation.get('id'),
    toCity: params.toLocation.get('name')
  }
});
