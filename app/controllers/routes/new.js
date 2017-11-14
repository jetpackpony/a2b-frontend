import Ember from 'ember';
import Route from '../../models/route';

export default Ember.Controller.extend({
  queryParams: ['shortForm'],
  shortForm: null,
  errorMessage: null,
  newRoute: null,
  showSpinner: false,
  actions: {
    createRoute(route, resolve, reject) {
      this.set('showSpinner', true);
      this.validateRoute(route).save()
        .then(() => {
          this.set('showSpinner', false);
          resolve();
        })
        .catch((error) => {
          this.set('showSpinner', false);
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
  },
  validateRoute(route) {
    Route.eachAttribute(function(name) {
      if (route.get(name) === null || route.get(name) === undefined) {
        route.set(name, "");
      }
    });
    return route;
  }
});
