import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['from', 'to'],
  from: null,
  to: null,
  formFilled: Ember.computed('from', 'to', function() {
    return this.get('from') !== null && this.get('to') !== null;
  }),
  actions: {
    search() {
      this.transitionToRoute({ queryParams: {
        from: event.target.querySelector("#from").value,
        to: event.target.querySelector("#to").value
      }});
    }
  }
});
