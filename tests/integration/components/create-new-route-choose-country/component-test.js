import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-new-route-choose-country', 'Integration | Component | create new route choose country', {
  integration: true
});

skip('it renders a select element with all the options', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-new-route-choose-country}}`);

  assert.equal(this.$().text().trim(), '');
});

skip('it sends the correct country name to the action provided');

