import Ember from 'ember';

export default Ember.Component.extend({
  description: Ember.computed('route.companyDescription', function() {
    return this.get('route.companyDescription') || false;
  })
});
