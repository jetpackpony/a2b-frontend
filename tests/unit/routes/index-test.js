import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('should transition to itineraries route', function(assert) {
  let route = this.subject({
    replaceWith(newRoute) {
      assert.equal(newRoute, 'itineraries', 'replace with itineraries route');
    }
  });
  route.beforeModel();
});
