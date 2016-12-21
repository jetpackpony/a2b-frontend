import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

const locations = [
  Ember.Object.create({ id: 1, name: 'Phnom Penh, Cambodia'}),
  Ember.Object.create({ id: 2, name: 'Ratanakiri, Cambodia'})
];

const enterEvent = $.Event('keyup');
enterEvent.which = 13;
enterEvent.keyCode = 13;
const arrowUpEvent = $.Event('keyup');
arrowUpEvent.which = 38;
arrowUpEvent.keyCode = 38;
const arrowDownEvent = $.Event('keyup');
arrowDownEvent.which = 40;
arrowDownEvent.keyCode = 40;

const locationsService = Ember.Service.extend({
  filter(value) {
    if (value === "Cam") {
      return RSVP.resolve(locations);
    } else {
      return RSVP.resolve([]);
    }
  }
});

let origDebounce = Ember.run.debounce;
moduleForComponent('location-autocomplete', 'Integration | Component | location autocomplete', {
  integration: true,
  beforeEach() {
    this.register('service:locations', locationsService);
    this.inject.service('locations', { as: 'locations' });
    Ember.run.debounce = function(ctx, func) {
      func.call(ctx);
    };
  },
  afterEach() {
    Ember.run.debounce = origDebounce;
  }
});

test('it shows suggestions in the dropdown', function(assert) {
  this.render(hbs`{{location-autocomplete }}`);
  this.$('input').focus();
  this.$('input').val('Cam').trigger('input');

  return wait().then(() => {
    let suggs = this.$('.suggestions li');
    assert.equal(suggs.length, 2, 'should show 2 suggestions');
    let first = $(this.$('.suggestions li')[0]).text().trim();
    let second = $(this.$('.suggestions li')[1]).text().trim();
    assert.equal(first, 'Phnom Penh, Cambodia', 'titles should be equal');
    assert.equal(second, 'Ratanakiri, Cambodia', 'titles should be equal');
  });
});

test('it does not show suggestions when no results', function(assert) {
  this.render(hbs`{{location-autocomplete }}`);
  this.$('input').focus();
  this.$('input').val('Olololo').trigger('input');

  return wait().then(() => {
    let suggs = this.$('.suggestions:visible');
    assert.equal(suggs.length, 0, 'should not show suggestions');
  });
});

test('it does not show suggestions if query is 2 chars or less', function(assert) {
  this.render(hbs`{{location-autocomplete }}`);
  this.$('input').focus();
  this.$('input').val('Ol').trigger('input');

  return wait().then(() => {
    let suggs = this.$('.suggestions:visible');
    assert.equal(suggs.length, 0, 'should not show suggestions');
  });
});

test('it calls a callback when item is selected', function(assert) {
  assert.expect(1);
  this.on('select', (item) => {
    assert.equal(item.get('name'), 'Ratanakiri, Cambodia', 'should select the item');
  });
  this.render(
    hbs`{{location-autocomplete select=(action "select")}}`
  );
  this.$('input').focus();
  this.$('input').val('Cam').trigger('input');
  $(this.$('.suggestions li')[1]).click();
});

test('it sets new value and removes suggestions when item selected', function(assert) {
  this.on('select', () => {});
  this.render(
    hbs`{{location-autocomplete select=(action "select")}}`
  );
  this.$('input').focus();
  this.$('input').val('Cam').trigger('input');
  $(this.$('.suggestions li')[1]).click();

  return wait().then(() => {
    let suggs = this.$('.suggestions:visible');
    let value = this.$('input').val();
    assert.equal(suggs.length, 0, 'should not show suggestions');
    assert.equal(value, 'Ratanakiri, Cambodia');
  });
});

test('it removes suggestions when blur', function(assert) {
  this.render(hbs`{{location-autocomplete }}`);
  this.$('input').focus();
  this.$('input').val('Cam').trigger('input');
  this.$('input').blur();

  return wait().then(() => {
    let suggs = this.$('.suggestions:visible');
    assert.equal(suggs.length, 0, 'should not show suggestions');
  });
});

test('it scrolls through the suggestions with keyboard', function(assert) {
  assert.expect(1);
  this.on('select', (item) => {
    assert.equal(item.get('name'), 'Ratanakiri, Cambodia', 'should select the item');
  });
  this.render(
    hbs`{{location-autocomplete select=(action "select")}}`
  );
  this.$('input').focus();
  this.$('input').val('Cam').trigger('input');
  // Press down arrow 3 times and up arrow 1 time and then enter
  this.$('input').trigger(arrowDownEvent);
  this.$('input').trigger(arrowDownEvent);
  this.$('input').trigger(arrowDownEvent);

  this.$('input').trigger(arrowUpEvent);

  let focused = this.$('.suggestions a:focus').attr('data-index');
  assert.equal(focused, '1', 'second link should be focused');
});

test('it clears the form when the X is clicked', function(assert) {
  this.render(hbs`{{location-autocomplete value="testme"}}`);
  assert.equal(this.$('input').val(), 'testme', 'value should match');

  this.$('.input-button').click();
  assert.equal(this.$('input').val(), '', 'value should be empty');
});
