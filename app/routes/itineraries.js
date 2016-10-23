import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    from: { refreshModel: true },
    to: { refreshModel: true }
  },
  model(params) {
    return this.get('store').
      query('itinerary', {
        filter: {
          from: params.from,
          to: params.to
        }
      });
  }
});