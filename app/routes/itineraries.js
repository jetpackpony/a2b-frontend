import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  queryParams: {
    fromId: { refreshModel: true },
    toId: { refreshModel: true }
  },
  model(params) {
    let filter = {
      from: params.fromId || "0",
      to: params.toId || "0"
    };
    return RSVP.hash({
      itineraries: this.get('store').query('itinerary', { filter }),
      from: this.get('store').findRecord('location', filter.from),
      to: this.get('store').findRecord('location', filter.to)
    });
  },
  afterModel() {
    this.incrementProperty('session.searchNumber');
  }
});
