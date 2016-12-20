import Ember from 'ember';
import MapClickHandlerMixin from 'a2b/mixins/map-click-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | map click handler');

// Replace this with your real tests.
test('it works', function(assert) {
  let MapClickHandlerObject = Ember.Object.extend(MapClickHandlerMixin);
  let subject = MapClickHandlerObject.create();
  assert.ok(subject);
});
