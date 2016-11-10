/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search itineraries');

test('should list itineraries only for specified locations', function(assert) {
  let city = "Bangkok, Thailand";
  server.create('itinerary', { fromCity: city, toCity: city });
  server.create('itinerary', { fromCity: city, toCity: city });
  server.create('itinerary', {
    fromCity: "Moscow, Russia",
    toCity: "Tver, Russia"
  });

  visit('/');
  fillIn("#from-wrapper input", city);
  fillIn("#to-wrapper input", city);
  click("button#submit");

  andThen(() => {
    assert.equal(find(".itinerary").length, 2, "should show 2 itineraries");
  });
});

test('should show a message if no locations are specified', function(assert) {
  visit('/itineraries');

  andThen(() => {
    assert.equal(find(".error").text().trim(), "Please specify locations in the form above", "should show error message");
  });
});

test('should show a message if no itineraries have been found', function(assert) {
  visit('/');
  fillIn("#from-wrapper input", "Blah, Thailand");
  fillIn("#to-wrapper input", "Ololo, Thailand");
  click("button#submit");

  andThen(() => {
    assert.equal(find(".itinerary").length, 0, "should show 0 itineraries");
    assert.equal(find(".error").text().trim(), "This route is not in our database yet", "should show error message");
  });
});

skip('should show details for a specific itinerary', function(assert) {
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  visit('/');
  fillIn("#from-wrapper input", from);
  fillIn("#to-wrapper input", to);
  click("button#submit");
  click("a:contains('bus to Phuket')");

  andThen(() => {
    assert.equal(find(".description").length, 1, "should show a description");
  });
});
