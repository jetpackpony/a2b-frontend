import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: null,
  newRoute: null,
  actions: {
    createRoute(route, resolve, reject) {
      route.save()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log('error:', error);
          this.set('errorMessage', error.message);
          reject();
        });
    },
    resetModel() {
      this.set('model', this.get('store').createRecord('route'));
    }
  }
});
