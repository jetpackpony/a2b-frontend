/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | add route');

test('displays a form to add a route', function(assert) {
  visit('/routes/new');

  andThen(function() {
    assert.equal(find("form#route-form").length, 1, "should see a form");
  });
});

test('sends a new route to the server when submitted', (assert) => {
  let route = server.create('route', {
    fromAddress: "test from address",
    toCity: "test to city",
  });
  visit('/routes/new');
  for (let key in route.attrs) {
    if (key === 'id') { continue; }
    fillIn(`input#${key}`, route[key]);
  }
  click("button#submit");

  andThen(() => {
    let record = server.db.routes[1].data.attributes;
    assert.equal(record['from-address'], "test from address");
    assert.equal(record['to-city'], "test to city");
  });
});

skip('displays a success message if successfully added', function() {});
skip('displays an error message if failed to add', function() {});
skip('displays a loader icon while waiting for the server', function() {});
