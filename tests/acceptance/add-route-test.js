/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | add route');

test('displays a form to add a route', function(assert) {
  visit('/routes/new');

  andThen(function() {
    assert.equal(find("form#new-route").length, 1, "should see a form");
  });
});

test('sends a new route to the server when submitted', (assert) => {
  let route = {
    fromAddress: "from address",
    fromCity: "from city",
    fromCoords: "from coords",

    toAddress: "to address",
    toCity: "to city",
    toCoords: "to coords",

    transportType: "transport type",
    organization: "organization",
    description: "description",

    duration: "duration",
    price: "price",
    timetable: "timetable",
  };
  visit('/routes/new');
  for (let key in Object.keys(route)) {
    fillIn(key, route[key]);
  }
  click("button#submit");

  andThen(() => {
    assert.equal(server.db.routes[0].fromAddress, "from address");
  });
});
