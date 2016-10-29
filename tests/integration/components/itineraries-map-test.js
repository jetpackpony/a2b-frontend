import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('itineraries-map', 'Integration | Component | itineraries map', {
  integration: true,
  beforeEach() {
    this.register('component:g-maps', Ember.Component.extend());
  }
});

let route1 = Ember.Object.create({
  fromCoords: "132.03031, -13.12481",
  toCoords: "33.1208433, -98.1777"
});
let route2 = Ember.Object.create({
  fromCoords: "20.03031, -13.12481",
  toCoords: "27.1208433, 42.1777"
});
test('ir renders a map component', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(1);
  this.register('component:g-maps', Ember.Component.extend({
    didRender() {
      assert.equal(true, true, "the map did render");
    }
  }));

  this.render(hbs`{{itineraries-map}}`);
});

test('it changes polylines when the selected itinerary is changed', function(assert) {
  assert.expect(5);

  // Stub the map component and check the number of lines created on it
  this.register('component:g-maps', Ember.Component.extend({
    lines: Ember.observer('polylines', function() {
      let lines = this.get('polylines');
      assert.equal(lines.length, 2, "the number of lines is wrong");
      assert.deepEqual(lines[0].path[0], [132.03031, -13.12481]);
      assert.deepEqual(lines[0].path[1], [33.1208433, -98.1777]);
      assert.deepEqual(lines[1].path[0], [20.03031, -13.12481]);
      assert.deepEqual(lines[1].path[1], [27.1208433, 42.1777]);
    })
  }));

  // Create an itinerary with 1 line and render the component
  this.set('selectedItinerary', Ember.Object.create({
    routes: [ route1 ]
  }));
  this.render(hbs`{{itineraries-map selectedItinerary=selectedItinerary}}`);

  // Change the itinerary to a different one
  this.set('selectedItinerary', Ember.Object.create({
    routes: [ route1, route2 ]
  }));

});
