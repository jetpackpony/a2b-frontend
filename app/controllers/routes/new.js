import Ember from 'ember';

export default Ember.Controller.extend({
  messages: Ember.A([]),
  errors: Ember.A([]),
  actions: {
    createRoute(route) {
      route.save().
        then(() => {
          //this.transitionToRoute('itineraries')
          this.get('messages').pushObject("Route added successfully. Add another one!");
        }).
        catch(() => {
          console.error('Failed to save', route);
          this.get('errors').pushObject("Failed to save route. Server problems, sorry");
        });
    }
  }
});
