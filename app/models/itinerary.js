import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  routes: DS.hasMany('route'),
  transport: Ember.computed('routes', function() {
    return this.get('routes').mapBy('transportType').uniq().join(' + ');
  }),
  organizations: Ember.computed('routes', function() {
    return this.get('routes').mapBy('organization').uniq().join(' + ');
  }),
  stops: Ember.computed('routes', function() {
    return this.get('routes').get('length') - 1;
  }),
  price: DS.attr('number'),
  duration: DS.attr('number')
});
