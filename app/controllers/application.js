import Ember from 'ember';

export default Ember.Controller.extend({
  error: null,
  menuOpen: false,
  onErrorChanged: Ember.observer('error', function() {
    let error = this.get('error');
    if (error) {
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
