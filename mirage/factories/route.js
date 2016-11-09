import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromAddress: faker.address.streetName,
  fromCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  fromCoords() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },

  toAddress: faker.address.streetName,
  toCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  toCoords() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },

  transportType: faker.list.cycle('bus', 'train', 'ferry'),
  organization: faker.list.cycle('Giant Express', 'AsiaLines', 'WaterCamb'),
  description: "Such comfort! Much VIP! WOW!",

  duration() {
    return faker.random.number(24);
  },
  price() {
    return faker.random.number(150);
  },
  timetable: faker.list.random("7:00 AM, 8:00 PM", "5:00 PM", "12:00 PM", "12:02 AM")
});
