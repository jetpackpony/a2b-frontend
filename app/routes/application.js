import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { getOwner } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAuthenticated() {
    // do not redirect or anything
  },
  actions: {
    error(error, transition) {
      if (error) {
        this.controllerFor('application').set('error', error);
      }
    },
    willTransition() {
      this.controllerFor('application').set('menuOpen', false);
    }
  }
});
