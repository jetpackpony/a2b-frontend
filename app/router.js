import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('itineraries');

  this.route('routes', function() {
    this.route('new');
  });
  this.route('about');
  this.route('login');
});

export default Router;
