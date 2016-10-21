import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    search() {
      this.attrs.submitSearch(
          event.target.querySelector("#from").value,
          event.target.querySelector("#to").value);
    }
  }
});
