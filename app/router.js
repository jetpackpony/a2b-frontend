import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('routes', function() {
    this.route('show', { path: "/:route_id"});
  });
  this.route('itineraries');
});

export default Router;
