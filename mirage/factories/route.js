import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fromAddress: faker.address.streetName,
  fromCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  fromCoords() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  fromComment: faker.lorem.paragraph,

  toAddress: faker.address.streetName,
  toCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  toCoords() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  toComment: faker.lorem.paragraph,

  organization: faker.list.cycle('Giant Express', 'AsiaLines', 'WaterCamb'),
  companyMail: faker.internet.email,
  companyPhone: "+66 (933) 123-33-33",
  companySite: faker.internet.url,
  companyDescription: "Delays, delays, delays",

  transportType: faker.list.cycle('bus', 'train', 'ferry'),
  duration() {
    return faker.random.number(24);
  },
  price() {
    return faker.random.number(150);
  },
  timetable: faker.list.random("7:00 AM, 8:00 PM", "5:00 PM", "12:00 PM", "12:02 AM"),
  description: "Such comfort! Much VIP! WOW!"
});
