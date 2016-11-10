import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-itineraries', 'Integration | Component | display itineraries', {
  integration: true,
  beforeEach() {
    this.register('component:itineraries-list', Ember.Component.extend());
    this.register('template:components/itineraries-list', '');
    this.register('component:itineraries-map', Ember.Component.extend());
    this.register('template:components/itineraries-map', '');
  }
});

test('it renders a itineraries list if form is filled in', function(assert) {
  assert.expect(1);
  this.register('template:components/itineraries-list', hbs`<div id='itineraries-list'>This is a test</div>`);
  this.set('formFilled', true);
  this.set('itineraries', Ember.A([]));

  this.render(hbs`{{display-itineraries itineraries=itineraries formFilled=formFilled}}`);

  assert.equal(this.$('#itineraries-list').length, 1);
});

test('it shows a message if form is not filled in', function(assert) {
  this.set('formFilled', false);
  this.set('itineraries', Ember.A([]));

  this.render(hbs`{{display-itineraries itineraries=itineraries formFilled=formFilled}}`);

  assert.equal(this.$('.error').text().trim(), "Please specify locations in the form above");
});

test('it renders a itineraries map component', function(assert) {
  assert.expect(1);
  this.register('template:components/itineraries-map', hbs`<div id='itineraries-map'>This is a test</div>`);
  this.set('formFilled', true);
  this.set('itineraries', Ember.A([]));

  this.render(hbs`{{display-itineraries itineraries=itineraries formFilled=formFilled}}`);
  assert.equal(this.$('#itineraries-map').length, 1);
});

test('it sends first itinerary to a map component as selected', function(assert) {
  assert.expect(1);
  this.register('component:itineraries-map', Ember.Component.extend({
    didRender() {
      assert.equal(this.get('selectedItinerary').get('id'), 1);
    }
  }));
  this.set('formFilled', true);
  this.set('itineraries', Ember.A([
        Ember.Object.create({ id: 1 }),
        Ember.Object.create({ id: 2 })
  ]));

  this.render(hbs`{{display-itineraries itineraries=itineraries formFilled=formFilled}}`);
});

test('sends null to a map component if no no itineraries', function(assert) {
  assert.expect(1);
  this.register('component:itineraries-map', Ember.Component.extend({
    didRender() {
      assert.equal(this.get('selectedItinerary'), null);
    }
  }));
  this.set('formFilled', true);
  this.set('itineraries', Ember.A([ ]));

  this.render(hbs`{{display-itineraries itineraries=itineraries formFilled=formFilled}}`);
});
