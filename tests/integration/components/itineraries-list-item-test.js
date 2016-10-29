import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('itineraries-list-item', 'Integration | Component | itineraries list item', {
  integration: true
});

test('it renders info about an item', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(1);

  this.render(hbs`{{itinerary-list-item}}`);
});

test('it triggers the itemHovered event when item is hovered', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(1);
});
