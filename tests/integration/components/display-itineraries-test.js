import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-itineraries', 'Integration | Component | display itineraries', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display-itineraries}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#display-itineraries}}
      template block text
    {{/display-itineraries}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders a itineraries list component', function(assert) {
});

test('it renders a itineraries map component', function(assert) {
});

test('it passes a selected itinerary to a map component', function(assert) {
});
