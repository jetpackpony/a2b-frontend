import Ember from 'ember';

export default Ember.Component.extend({
  description: Ember.computed('route.companyDescription', function() {
    let desc = this.get('route.companyDescription');
    if (!desc || desc === 'null')  {
      return false;
    }
    return desc;
  })
});
