import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('location-autocomplete-error', 'Integration | Component | location autocomplete error', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{location-autocomplete-error}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#location-autocomplete-error}}
      template block text
    {{/location-autocomplete-error}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
