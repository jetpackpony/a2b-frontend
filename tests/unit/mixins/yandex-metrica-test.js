import Ember from 'ember';
import YandexMetricaMixin from 'a2b/mixins/yandex-metrica';
import { module, test } from 'qunit';

module('Unit | Mixin | yandex metrica');

// Replace this with your real tests.
test('it works', function(assert) {
  let YandexMetricaObject = Ember.Object.extend(YandexMetricaMixin);
  let subject = YandexMetricaObject.create();
  assert.ok(subject);
});
