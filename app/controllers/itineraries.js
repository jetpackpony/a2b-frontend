import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['from', 'to'],
  from: null,
  to: null,
  formFilled: Ember.computed('from', 'to', function() {
    return this.get('from') !== null && this.get('to') !== null &&
      this.get('from') !== "" && this.get('to') !== "";
  }),
  actions: {
    search(from_city, to_city) {
      this.transitionToRoute({ queryParams: {
        from: from_city,
        to: to_city
      }});
    }
  }
});
