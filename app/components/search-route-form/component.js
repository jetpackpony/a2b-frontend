import Ember from 'ember';

export default Ember.Component.extend({
  from: null,
  to: null,
  actions: {
    search() {
      this.attrs.submitSearch(
          event.target.querySelector("#from").value,
          event.target.querySelector("#to").value);
    }
  }
});
