import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    error(error, transition) {
      if (error) {
        console.log('application is such error', error);
      }
    }
  }
});
