import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['shortForm'],
  shortForm: null,
  errorMessage: null,
  newRoute: null,
  actions: {
    createRoute(route, resolve, reject) {
      route.save()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          let obj = JSON.stringify(route.toJSON({ includeId: true }));
          console.log('error:', error);
          console.log('error object:', obj);
          this.set('errorMessage', error.message + ":\n " + obj);
          reject();
        });
    },
    resetModel() {
      this.set('model', this.get('store').createRecord('route'));
    }
  }
});
