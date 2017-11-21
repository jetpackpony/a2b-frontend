import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  routes: DS.hasMany('route'),
  transport: Ember.computed('routes', function() {
    return getTransports(this.get('routes'));
  }),
  organizations: Ember.computed('routes', function() {
    return getOrganizations(this.get('routes'));
  }),
  stops: Ember.computed('routes', function() {
    return getStops(this.get('routes'));
  }),
  price: DS.attr('number'),
  duration: DS.attr('number')
});

const getTransports = (routes) => (
  routes.mapBy('transportType').uniq().join(' + ')
);

const getOrganizations = (routes) => (
  routes.mapBy('organization').uniq().join(' + ')
);

const getStops = (routes) => (
  routes.get('length') - 1
);
