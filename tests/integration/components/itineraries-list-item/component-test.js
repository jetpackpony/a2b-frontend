import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('itineraries-list-item', 'Integration | Component | itinerary list-item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{itineraries-list-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#itineraries-list-item}}
      template block text
    {{/itineraries-list-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
