import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('location-autocomplete', 'Integration | Component | location autocomplete', {
  integration: true
});

const locations = [{name: 'Phnom Penh, Cambodia'}, {name: 'Ratanakiri, Cambodia'}];
const filterFn = (val) => {
  if (val === "Cam") {
    return RSVP.resolve(locations);
  } else {
    return RSVP.resolve([]);
  }
};

test('it shows suggestions in the dropdown', function(assert) {
  this.on('filter', filterFn);
  this.render(hbs`{{location-autocomplete filter=(action "filter")}}`);
  this.$('input').val('Cam').keyup();

  return wait().then(() => {
    let suggs = this.$('.suggestions li');
    assert.equal(suggs.length, 2, 'should show 2 suggestions');
    let first = $(this.$('.suggestions li')[0]).text().trim();
    let second = $(this.$('.suggestions li')[1]).text().trim();
    assert.equal(first, 'Phnom Penh, Cambodia', 'titles should be equal');
    assert.equal(second, 'Ratanakiri, Cambodia', 'titles should be equal');
  });
});

test('it shows a "nothing found" message when no results', function(assert) {
  this.on('filter', filterFn);
  this.render(hbs`{{location-autocomplete filter=(action "filter")}}`);
  this.$('input').val('Olololo').keyup();

  return wait().then(() => {
    let suggs = this.$('.suggestions li');
    assert.equal(suggs.length, 1, 'should show 1 suggestions');
    assert.equal(suggs.text().trim(), 'No locations found', 'should display empty message');
  });
});

test('it does not show suggestions if query is 2 chars or less', function(assert) {
  this.on('filter', filterFn);
  this.render(hbs`{{location-autocomplete filter=(action "filter")}}`);
  this.$('input').val('Ol').keyup();

  return wait().then(() => {
    let suggs = this.$('.suggestions:visible');
    assert.equal(suggs.length, 0, 'should not show suggestions');
  });
});
