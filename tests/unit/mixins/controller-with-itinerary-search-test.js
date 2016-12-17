import Ember from 'ember';
import ControllerWithItinerarySearchMixin from 'a2b/mixins/controller-with-itinerary-search';
import { module, test } from 'qunit';

module('Unit | Mixin | controller with itinerary search');

test('it calls transitionTo with correct params', function(assert) {
  assert.expect(4);
  let subject = Ember.Object.extend(ControllerWithItinerarySearchMixin).create({
    transitionToRoute(route, params) {
      let p = params.queryParams;
      assert.equal(p.fromId, '1', 'the params should match');
      assert.equal(p.fromCity, 'from-name', 'the params should match');
      assert.equal(p.toId, '2', 'the params should match');
      assert.equal(p.toCity, 'to-name', 'the params should match');
    }
  });
  subject.actions.search.call(subject, {
    fromLocation: Ember.Object.create({ id: 1, name: 'from-name' }),
    toLocation: Ember.Object.create({ id: 2, name: 'to-name' })
  });
});
