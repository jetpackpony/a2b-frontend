import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('location-autocomplete-suggestons', 'Integration | Component | location autocomplete suggestons', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{location-autocomplete-suggestons}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#location-autocomplete-suggestons}}
      template block text
    {{/location-autocomplete-suggestons}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
