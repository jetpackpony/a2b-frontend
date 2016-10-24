import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-new-route', 'Integration | Component | create new route', {
  integration: true
});

test('it renders a form', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-new-route}}`);
  assert.equal(this.$('form').length, 1);
});

test('it sends data to the controller on submit', function(assert) {

});

