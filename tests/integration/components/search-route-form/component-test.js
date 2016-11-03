import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-route-form', 'Integration | Component | search route form', {
  integration: true
});

test('it renders a form with pre-filled fields', function(assert) {
  this.render(hbs`
    {{search-route-form from="test-from" to="test-to"}}
  `);

  assert.equal(this.$('#from-wrapper input').val().trim(), 'test-from');
  assert.equal(this.$('#to-wrapper input').val().trim(), 'test-to');
});

test('it calls a specified search action with correct values', function(assert) {
  assert.expect(2);

  this.set('actionStub', (actual_from, actual_to) => {
    assert.equal(actual_from, 'new-from');
    assert.equal(actual_to, 'new-to');
  });

  this.render(hbs`
    {{search-route-form
       from="test-from"
       to="test-to"
       submitSearch=(action actionStub)}}
  `);

  this.$('#from-wrapper input').val('new-from');
  this.$('#to-wrapper input').val('new-to');
  this.$('#from-wrapper input').change();
  this.$('#to-wrapper input').change();

  this.$('button#submit').click();
});

skip('it renders an inline form if a parameter is passed', function() {

});

skip('it calls google places api with correct inputs')
