import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  // Change header background color on this route to black
  activate() {
    this._super(arguments);
    Ember.$('body').addClass('no-picture');
  },
  deactivate() {
    this._super(arguments);
    Ember.$('body').removeClass('no-picture');
  },

  queryParams: {
    fromId: { refreshModel: true },
    toId: { refreshModel: true }
  },
  model(params) {
    return ((params.fromId && params.toId)
      ? RSVP.hash({
        itineraries: this.get('store').query('itinerary', {
          filter: {
            from: params.fromId,
            to: params.toId
          }
        }),
        from: this.get('store').findRecord('location', params.fromId),
        to: this.get('store').findRecord('location', params.toId)
      })
      : RSVP.hash({
        itineraries: RSVP.resolve(Ember.A([])),
        from: RSVP.resolve(Ember.Object.create({ id: null, name: null })),
        to: RSVP.resolve(Ember.Object.create({ id: null, name: null })),
      })
    );
  },
  afterModel() {
    this.incrementProperty('session.searchNumber');
    this.controllerFor('index').set('showSpinner', false);
  }
});
