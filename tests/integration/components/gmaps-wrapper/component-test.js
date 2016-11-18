import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gmaps-wrapper', 'Integration | Component | gmaps wrapper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gmaps-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gmaps-wrapper}}
      template block text
    {{/gmaps-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
