import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
