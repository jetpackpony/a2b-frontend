import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('itinerary-short', 'Integration | Component | itinerary short', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{itinerary-short}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#itinerary-short}}
      template block text
    {{/itinerary-short}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
