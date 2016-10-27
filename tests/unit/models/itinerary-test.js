import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('itinerary', 'Unit | Model | itinerary', {
  // Specify the other units that are required for this test.
  needs: ['model:route']
});

test('it should have routes', function(assert) {
  const Itinerary = this.store().modelFor('itinerary');
  const rel = Ember.get(Itinerary, 'relationshipsByName').get('routes');

  assert.equal(rel.key, 'routes', 'should have routes');
  assert.equal(rel.kind, 'hasMany', 'should have many routes');
});

test('it composes the title correctly', function(assert) {
  let routes = [];
  Ember.run(() => {
    routes.push(this.store().createRecord('route', {
      transportType: "bus", toCity: "Bangkok, Thailand"
    }));
    routes.push(this.store().createRecord('route', {
      transportType: "ferry", toCity: "Phuket, Thailand"
    }));
  });

  const itinerary = this.subject({ routes: routes });

  assert.equal(
      itinerary.get('title'),
      "bus to Bangkok, Thailand -> ferry to Phuket, Thailand",
      "the title of itinerary is incorrect");

});
