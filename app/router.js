import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';
import yandexMetrica from './mixins/yandex-metrica';

const Router = Ember.Router.extend(googlePageview, yandexMetrica, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('itineraries');

  this.route('routes', function() {
    this.route('new');
  });
  this.route('about');
});

export default Router;
