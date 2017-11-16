import Ember from 'ember';
import GMapGeocodesMixin from 'a2b/mixins/g-map-geocodes';
import { module, test } from 'qunit';

module('Unit | Mixin | g map geocodes');

// Replace this with your real tests.
test('it works', function(assert) {
  let GMapGeocodesObject = Ember.Object.extend(GMapGeocodesMixin);
  let subject = GMapGeocodesObject.create();
  assert.ok(subject);
});
