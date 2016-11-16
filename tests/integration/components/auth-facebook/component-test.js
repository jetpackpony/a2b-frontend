import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('auth-facebook', 'Integration | Component | auth facebook', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{auth-facebook}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#auth-facebook}}
      template block text
    {{/auth-facebook}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
