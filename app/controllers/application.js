import Ember from 'ember';

export default Ember.Controller.extend({
  error: null,
  menuOpen: false,
  onErrorChanged: Ember.observer('error', function() {
    if (this.get('error')) {
      $('.modal').modal();
      $('.modal').modal('show');
    }
  }),
  actions: {
    closeError() {
      $('.modal').modal('hide');
    }
  }
});
