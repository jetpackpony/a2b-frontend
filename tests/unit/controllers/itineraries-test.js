import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:itineraries', 'Unit | Controller | itineraries', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it redirects to search page', function(assert) {
  assert.expect(2);

  const ctrl = this.subject();
  const from = "from_test";
  const to = "to_test";

  ctrl.transitionToRoute = (obj) => {
    assert.equal(obj.queryParams.from, from, "from param is wrong");
    assert.equal(obj.queryParams.to, to, "to param is wrong");
  };

  ctrl.send("search", from, to);
});

test('it checks if the form is filled in correctly', function(assert) {
  assert.expect(3);

  const ctrl = this.subject();
  assert.equal(ctrl.get("formFilled"), false, "the form should not be filled");

  ctrl.set('from', 'test');
  assert.equal(ctrl.get("formFilled"), false, "the form should not be filled");

  ctrl.set('to', 'test');
  assert.equal(ctrl.get("formFilled"), true, "the form should be filled");
});
