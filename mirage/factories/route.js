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

  return [y + y0, x + x0];
};

let randomInThailand = function() {
  return randomCoords({lat: 10, lng: 100}, 500000);
};

let randomInCity = function(coords) {
  return randomCoords(coords, 2000);
};

export default Factory.extend({
  fromAddress() { return faker.address.streetName(); },
  fromCity() { return faker.fake("{{address.city}}, {{address.country}}"); },
  fromComment() { return faker.lorem.paragraph(); },
  fromLat() { return randomInThailand()[0]; },
  fromLng() { return randomInThailand()[1]; },

  toAddress() { return faker.address.streetName(); },
  toCity() { return faker.fake("{{address.city}}, {{address.country}}"); },
  toComment() { return faker.lorem.paragraph(); },
  toLat() { return randomInThailand()[0]; },
  toLng() { return randomInThailand()[1]; },

  organization: faker.list.cycle('Giant Express', 'AsiaLines', 'WaterCamb'),
  companyMail() { return faker.internet.email(); },
  companyPhone() { return faker.phone.phoneNumber("+66-(###)-###-####"); },
  companySite() { return faker.internet.url(); },
  companyDescription() { return faker.lorem.paragraph(); },

  transportType: faker.list.cycle('bus', 'train', 'ferry'),
  duration() { return faker.random.number(24); },
  price() { return faker.random.number(150); },
  timetable: faker.list.random("7:00 AM, 8:00 PM", "5:00 PM", "12:00 PM", "12:02 AM"),
  description() { return faker.lorem.paragraph(); }
});
