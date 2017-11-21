import Ember from 'ember';
import Route from '../../models/route';

export default Ember.Controller.extend({
  errorMessage: null,
  showSpinner: false,
  actions: {
    createRoute(route, resolve, reject) {
      this.set('showSpinner', true);
      this.prepareRoute(route).save()
        .then(() => {
          this.set('showSpinner', false);
          resolve();
        })
        .catch((error) => {
          this.set('showSpinner', false);
          console.log('error:', error);
          console.log('error object:', serializeRoute(route));
          this.set('errorMessage',
            `${error.message}:\n ${serializeRoute(route)}`
          );
          reject();
        });
    },
    resetModel() {
      this.set('model', this.get('store').createRecord('route'));
    }
  },
  prepareRoute(route) {
    Route.eachAttribute((name) => (
      Ember.isEmpty(route.get(name))
        ? route.set(name, "")
        : null
    ));
    return route;
  }
});

const serializeRoute = (route) => (
  JSON.stringify(route.toJSON({ includeId: true }))
);
