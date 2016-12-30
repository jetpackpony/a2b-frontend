import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  tagName: "nav",
  classNames: ["navbar","navbar-full"],
  actions: {
    openOverlay(e) {
      this.set('menuOpen', true);
    },
    closeOverlay() {
      this.set('menuOpen', false);
    }
  }
});
