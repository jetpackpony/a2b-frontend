import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    error(error, transition) {
      if (error) {
        let controller = this.controllerFor('application');
        controller.set('error', error);
      }
    }
  }
});
