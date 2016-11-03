/* globals server */

import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import GooglePlaceAutocompleteResponseMock from '../helpers/google-place-autocomplete-response-mock';
import Resolver from '../../resolver';

const { RSVP: { Promise } } = Ember;

let MockResolver = Resolver.extend({
  resolveOther: function(parsedName) {
    if (parsedName.fullName === "component:g-maps") {
      return undefined;
    } else {
      return this._super(parsedName);
    }
  }
});

export default function(name, options = {}) {
  module(name, {
    beforeEach() {

      this.application = startApp({
        Resolver: MockResolver
      });
      this.application.unregister('component:g-maps');
      this.application.register('component:g-maps', Ember.Component.extend());

      // Mock only google places
      window.google.maps.places = {
        Autocomplete() {
          return {
            addListener(event, f) {
              f.call();
            },
            getPlace() {
              return GooglePlaceAutocompleteResponseMock;
            }
          };
        }
      };

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach).then(() => {
        server.shutdown();
        destroyApp(this.application);
      });
    }
  });
}
