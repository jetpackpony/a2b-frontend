import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-new-route-choose-location-short', 'Integration | Component | create new route choose location short', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-new-route-choose-location-short}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#create-new-route-choose-location-short}}
      template block text
    {{/create-new-route-choose-location-short}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
