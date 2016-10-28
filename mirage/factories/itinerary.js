import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromCity: faker.fake("{{address.city}}, {{address.country}}"),
  toCity: faker.fake("{{address.city}}, {{address.country}}")
});
