import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  queryParams: {
    fromId: { refreshModel: true },
    toId: { refreshModel: true }
  },
  model(params) {
    let from = params.fromId;
    let to = params.toId;
    if (from && to) {
      return RSVP.hash({
        itineraries: this.get('store').query('itinerary', { filter: { from, to } }),
        from: this.get('store').findRecord('location', from),
        to: this.get('store').findRecord('location', to)
      });
    } else {
      return RSVP.hash({
        itineraries: RSVP.resolve(Ember.A([])),
        from: RSVP.resolve(Ember.Object.create({ id: null, name: null })),
        to: RSVP.resolve(Ember.Object.create({ id: null, name: null })),
      });
    }
  },
  afterModel() {
    this.incrementProperty('session.searchNumber');
  }
});
