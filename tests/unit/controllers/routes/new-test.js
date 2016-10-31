import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import { moduleFor, test } from 'ember-qunit';

let originalConsole;

moduleFor('controller:routes/new', 'Unit | Controller | routes/new', {
  beforeEach() {
    originalConsole = console.error;
  },
  afterEach() {
    console.error = originalConsole;
  }
});

test('adds a message to messages array if model is saved', function(assert) {
  assert.expect(1);
  const model = {
    save() {
      return new Ember.RSVP.Promise((resolve) => resolve());
    }
  };
  const ctrl = this.subject();
  ctrl.transitionToRoute = (route) => {
    assert.equal(route, 'itineraries', 'should redirect to /itineraries');
  };

  ctrl.send('createRoute', model);
});

test('adds an error to errors array if model is rejected', function() {});

test('it logs an error if model save is rejected', function(assert) {
  assert.expect(1);
  const model = {
    save() {
      return new Ember.RSVP.Promise((resolve, reject) => reject());
    }
  };
  const ctrl = this.subject();
  console.error = (msg) => {
    assert.equal(msg, 'Failed to save', 'should log an error');
  };

  ctrl.send('createRoute', model);
  // Because promises, need to wait
  return wait();
});
