import { test } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | List Routes');

test('should show the fields of the form', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(find("input#from").length, 1, "should see a From field");
    assert.equal(find("input#to").length, 1, "should see a To field");
    assert.equal(find("button#submit").length, 1, "should see a Submit button");
  });
});

test('should list routes for specified locations', function(assert) {
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");

  andThen(() => {
    assert.equal(find(".route").length, 3, "should show 3 routes");
  });
});

test('should show a message if no locations are specified', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentURL(), '/routes', 'should navigate to empty route');
    assert.equal(find(".error").text(), "Please specify locations in the form above", "should show error message");
  });
});

test('should show a message if no locations are specified', function(assert) {
  let [from, to] = ["Blah, Thailand", "Ololo, Thailand"];
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");

  andThen(() => {
    assert.equal(find(".route").length, 0, "should show 0 routes");
    assert.equal(find(".error").text(), "No routes found between locations you've specified", "should show error message");
  });
});

test('should show details for a specific route', function(assert) {
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");
  click("a:contains('Bus Siam Tour')");

  andThen(() => {
    assert.equal(currentURL(), '/routes/1', 'should navigate to show route');
    assert.equal(find(".description").length, 1, "should show a description");
  });
});
