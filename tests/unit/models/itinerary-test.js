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

test('it composes the types string correctly', function(assert) {
  let routes = [];
  Ember.run(() => {
    routes.push(this.store().createRecord('route', {
      transportType: "bus"
    }));
    routes.push(this.store().createRecord('route', {
      transportType: "ferry"
    }));
    routes.push(this.store().createRecord('route', {
      transportType: "ferry"
    }));
  });

  const itinerary = this.subject({ routes: routes });

  assert.equal(
      itinerary.get('types'),
      "bus, ferry",
      "the types string of itinerary is incorrect");

});

test('it composes the organizations string correctly', function(assert) {
  let routes = [];
  Ember.run(() => {
    routes.push(this.store().createRecord('route', {
      organization: "Uncle Freddie's"
    }));
    routes.push(this.store().createRecord('route', {
      organization: "Planet Express"
    }));
    routes.push(this.store().createRecord('route', {
      organization: "Planet Express"
    }));
  });

  const itinerary = this.subject({ routes: routes });

  assert.equal(
      itinerary.get('organizations'),
      "Uncle Freddie's, Planet Express",
      "the organizations string of itinerary is incorrect");

});
