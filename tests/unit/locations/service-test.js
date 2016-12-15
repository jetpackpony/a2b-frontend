import { moduleFor, test } from 'ember-qunit';

moduleFor('service:locations', 'Unit | Service | locations', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

const storeService = Ember.Service.extend();

test('it queries the store if value is set', function(assert) {
  assert.expect(2);
  let service = this.subject({
    store: storeService.create({
      query(model, filter) {
        assert.equal(model, "location", 'should query the correct model');
        assert.equal(filter.filter.name, "testme", 'should send the correct value');
      }
    })
  });
  service.filter('testme');
});


