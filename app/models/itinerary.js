import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  routes: DS.hasMany('route'),
  title: Ember.computed('routes', function() {
    let connector = " -> ";
    let title = this.get('routes').reduce((val, item) => {
      return val + item.get('transportType') + " to " + item.get('toCity') + connector;
    }, "");
    return title.substr(0, title.length - connector.length);
  })
});
