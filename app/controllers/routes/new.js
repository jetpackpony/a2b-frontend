import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['shortForm'],
  shortForm: null,
  errorMessage: null,
  newRoute: null,
  showSpinner: false,
  actions: {
    createRoute(route, resolve, reject) {
      this.set('showSpinner', true);
      route.save()
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
  }
});
