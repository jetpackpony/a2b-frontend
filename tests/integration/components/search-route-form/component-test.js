import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const locations = [
  Ember.Object.create({ id: 1, name: 'Phnom Penh, Cambodia'}),
  Ember.Object.create({ id: 2, name: 'Ratanakiri, Cambodia'}),
  Ember.Object.create({ id: 1, name: 'Bangkok, Thailand'}),
  Ember.Object.create({ id: 2, name: 'Phuket, Thailand'})
];

moduleForComponent('search-route-form', 'Integration | Component | search route form', {
  integration: true,
  beforeEach() {
    //Stub autocomplete component and template
    this.register(
      'component:location-autocomplete',
      Ember.Component.extend({
        actions: {
          handleChange(e) {
            let val = e.target.value;
            if (val === 'Phno') {
              this.get('select')(locations[0]);
            } else if (val === 'Rata') {
              this.get('select')(locations[1]);
            }
          }
        }
      })
    );
    this.register(
      'template:components/location-autocomplete',
      hbs`{{input value=value change=(action 'handleChange')}}`
    );
  }
});

test('it renders a form with pre-filled fields', function(assert) {
  this.render(hbs`
    {{search-route-form from="test-from" to="test-to"}}
  `);

  let from = this.$('#from-wrapper input').val().trim();
  let to = this.$('#to-wrapper input').val().trim();

  assert.equal(from, 'test-from', 'from value should be setup properly');
  assert.equal(to, 'test-to', 'to value should be setup properly');
});

test('it calls a submitSearch action with correct values', function(assert) {
  assert.expect(2);
  this.set('searchStub', (params) => {
    assert.equal(params.fromLocation, locations[0], 'from locations should match');
    assert.equal(params.toLocation, locations[1], 'to locations should match');
  });

  this.render(hbs`{{search-route-form submitSearch=(action searchStub)}}`);
  this.$('#from-wrapper input').val('Phno').change();
  this.$('#to-wrapper input').val('Rata').change();

  this.$('button[type="submit"]').click();
});
