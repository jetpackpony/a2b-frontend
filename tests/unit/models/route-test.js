import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route', 'Unit | Model | route', {
  // Specify the other units that are required for this test.
  needs: ['model:itinerary']
});

test('it generates the title properly', function(assert) {
  const type = "bus";
  const city = "Test, Thailand";
  const route = this.subject({ transportType: type, toCity: city });

  assert.equal(route.get('title'), `${type} to ${city}`, "wrong");
});
