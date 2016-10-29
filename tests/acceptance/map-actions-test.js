/* globals server */

import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | map actions');

test('should display first itinerary map', function(assert) {
  assert.expect(2);

  // Create models
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  let itinerary = server.create('itinerary', { fromCity: from, toCity: to });
  let route = server.create('route');
  server.create('itinerary-route', { itinerary, route });

  // Stub the map and assertion
  this.application.register('component:g-maps', Ember.Component.extend({
    lines: Ember.observer('polylines', function() {
      let path = this.get('polylines')[0].path;
      let from = route.fromCoords.split(', ').map(parseFloat);
      let to = route.toCoords.split(', ').map(parseFloat);
      assert.deepEqual(path[0], from, "from coords are worng");
      assert.deepEqual(path[1], to, "to coords are worng");
    })
  }));

  // Do the thing
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");
});

test('should display another itinerary when hovered', function(assert) {
  assert.expect(2);

  // Create models
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  server.create('itinerary-route', {
    itinerary: server.create('itinerary', { fromCity: from, toCity: to }),
    route: server.create('route')
  });
  server.create('itinerary-route', {
    itinerary: server.create('itinerary', { fromCity: from, toCity: to }),
    route: server.create('route')
  });

  let itinerary = server.create('itinerary', { fromCity: from, toCity: to });
  let routes = [server.create('route'), server.create('route')];
  server.create('itinerary-route', { itinerary, route: routes[0] });
  server.create('itinerary-route', { itinerary, route: routes[1] });

  // Stub the map and assertion
  let calls = [];
  this.application.register('component:g-maps', Ember.Component.extend({
    lines: Ember.observer('polylines', function() {
      calls.push(this.get('polylines'));
    })
  }));

  // Do the thing
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");

  triggerEvent('#itinerary-3', 'mouseenter');

  andThen(() => {
    assert.equal(calls.length, 2, "the lines have to be drawn 2 times");
  });
});
