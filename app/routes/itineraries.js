import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  queryParams: {
    fromId: { refreshModel: true },
    toId: { refreshModel: true }
  },
  model(params) {
    return this.get('store').
      query('itinerary', {
        filter: {
          from: params.fromId || "0",
          to: params.toId || "0"
        }
      });
  },
  afterModel() {
    this.incrementProperty('session.searchNumber');
  }
});
