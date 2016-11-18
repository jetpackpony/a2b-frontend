import { Factory, faker } from 'ember-cli-mirage';

let randomCoords = function(center, radius) {
  let y0 = center.lat;
  let x0 = center.lng;
  let rd = radius/111300;

  let u = Math.random();
  let v = Math.random();

  let w = rd * Math.sqrt(u);
  let t = 2 * Math.PI * v;
  let x = w * Math.cos(t);
  let y = w * Math.sin(t);

  return `${y + y0}, ${x + x0}`;
};

let randomInThailand = function() {
  return randomCoords({lat: 10, lng: 100}, 500000);
};

let randomInCity = function(coords) {
  return randomCoords(coords, 2000);
};

export default Factory.extend({
  fromAddress: faker.address.streetName,
  fromCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  fromCoords() {
    return randomInThailand();
  },
  fromComment: faker.lorem.paragraph,

  toAddress: faker.address.streetName,
  toCity() {
    return faker.fake("{{address.city}}, {{address.country}}");
  },
  toCoords() {
    return randomInThailand();
  },
  toComment: faker.lorem.paragraph,

  organization: faker.list.cycle('Giant Express', 'AsiaLines', 'WaterCamb'),
  companyMail: faker.internet.email,
  companyPhone() {
    return faker.phone.phoneNumber("+66-(###)-###-####");
  },
  companySite: faker.internet.url,
  companyDescription: faker.lorem.paragraph,

  transportType: faker.list.cycle('bus', 'train', 'ferry'),
  duration() {
    return faker.random.number(24);
  },
  price() {
    return faker.random.number(150);
  },
  timetable: faker.list.random("7:00 AM, 8:00 PM", "5:00 PM", "12:00 PM", "12:02 AM"),
  description: faker.lorem.paragraph
});
