import { test } from 'qunit';
import moduleForAcceptance from 'a2b/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home page');

test('should show the fields of the form', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(find("input#from").length, 1, "should see a From field");
    assert.equal(find("input#to").length, 1, "should see a To field");
    assert.equal(find("button#submit").length, 1, "should see a Submit button");
  });
});
