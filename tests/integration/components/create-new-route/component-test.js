import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-new-route', 'Integration | Component | create new route', {
  integration: true,
  beforeEach() {
    this.inject.service('store');
  }
});

test('it renders a form', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-new-route}}`);
  assert.equal(this.$('form').length, 1);
});

test('it sends the route to the controller on submit', function(assert) {
  assert.expect(2);

  Ember.run(() => {
    this.set('model', this.get('store').createRecord('route', { fromCity: "test" }));
  });
  this.set('createRouteStub', (route) => {
    assert.equal(route.get('fromCity'), "test-from", "from city should be");
    assert.equal(route.get('toCity'), "test-to", "to city should be");
  });
  this.render(hbs `
    {{create-new-route
       newRoute=model
       createRoute=(action createRouteStub)}}
  `);

  this.$('input#from-city').val("test-from");
  this.$('input#to-city').val("test-to");
  this.$('input#from-city').change();
  this.$('input#to-city').change();

  this.$('button#submit').click();
});

