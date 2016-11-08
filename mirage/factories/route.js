import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromAddress: faker.address.streetName(),
  fromCity: faker.fake("{{address.city}}, {{address.country}}"),
  fromCoords: faker.fake("{{address.latitude}}, {{address.longitude}}"),
  fromComment: faker.lorem.paragraph(),

  toAddress: faker.address.streetName(),
  toCity: faker.fake("{{address.city}}, {{address.country}}"),
  toCoords: faker.fake("{{address.latitude}}, {{address.longitude}}"),
  toComment: faker.lorem.paragraph(),

  transportType: faker.list.random('bus', 'train', 'ferry', 'choppah'),
  organization: faker.company.companyName(),
  description: faker.lorem.paragraph(),

  duration: faker.random.number(),
  price: faker.random.number(),
  timetable: faker.list.random("7:00 AM", "5:00 PM", "12:00 PM", "12:02 AM")
});
