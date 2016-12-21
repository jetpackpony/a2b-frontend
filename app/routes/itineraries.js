import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
  }
});
