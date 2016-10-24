import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createRoute(route) {
      route.save().
        then(() => this.transitionToRoute('itineraries')).
        catch(() => console.error("Failed to save", route));
    }
  }
});
