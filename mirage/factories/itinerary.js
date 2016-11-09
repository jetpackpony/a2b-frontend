import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  toCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  price() {
    return faker.random.number(150);
  },
  duration() {
    return faker.random.number(24);
  }
});
