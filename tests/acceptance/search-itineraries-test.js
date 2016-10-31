/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search itineraries');

test('should list itineraries only for specified locations', function(assert) {
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  server.create('itinerary', { fromCity: from, toCity: to });
  server.create('itinerary', { fromCity: from, toCity: to });
  server.create('itinerary', {
    fromCity: "Moscow, Russia",
    toCity: "Tver, Russia"
  });

  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");

  andThen(() => {
    assert.equal(find(".itinerary").length, 2, "should show 2 itineraries");
  });
});

test('should show a message if no locations are specified', function(assert) {
  visit('/itineraries');
  andThen(() => {
    assert.equal(currentURL(), '/itineraries', 'should navigate to empty route');
    assert.equal(find(".error").text(), "Please specify locations in the form above", "should show error message");
  });
});

test('should show a message if no itineraries have been found', function(assert) {
  visit('/');
  fillIn("#from", "Blah, Thailand");
  fillIn("#to", "Ololo, Thailand");
  click("button#submit");

  andThen(() => {
    assert.equal(find(".itinerary").length, 0, "should show 0 itineraries");
    assert.equal(find(".error").text(), "No routes found between locations you've specified", "should show error message");
  });
});

test('should show details for a specific itinerary', function(assert) {
  let [from, to] = ["Bangkok, Thailand", "Phuket, Thailand"];
  visit('/');
  fillIn("#from", from);
  fillIn("#to", to);
  click("button#submit");
  click("a:contains('bus to Phuket')");

  andThen(() => {
    assert.equal(find(".description").length, 1, "should show a description");
  });
});
