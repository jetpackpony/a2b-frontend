import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('itineraries-list', 'Integration | Component | itineraries list', {
  integration: true,
  beforeEach() {
    this.register('component:itineraries-list-item', Ember.Component.extend());
    this.register('template:components/itineraries-list-item', '');
  }
});

test('it renders a list of items', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(1);
  this.render(hbs`{{itinerary-list-item}}`);
});

test('it shows a message if the collection is empty', function(assert) {
  assert.expect(1);
});

test('it changes the selectedItem if another item is hovered', function(assert) {
  assert.expect(1);
});

test('it doesn\'t change the selectedItem if the same item is hovered', function(assert) {
  assert.expect(1);
});
