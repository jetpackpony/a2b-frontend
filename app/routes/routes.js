import Ember from 'ember';

let routes = [{
  id: "1",
  title: "Bus Siam Tour",
  description: "A very fast bus also so cheap",
  price: "300-400 RUB",
  from_city: "Bangkok, Thailand",
  to_city: "Phuket, Thailand"
}, {
  id: "2",
  title: "Ferry Siam Tour",
  description: "A very fast bus also so cheap",
  price: "3300-5400 RUB",
  from_city: "Bangkok, Thailand",
  to_city: "Phuket, Thailand"
}, {
  id: "3",
  title: "Train Ololo Tour",
  description: "A very fast bus also so cheap",
  price: "300-400 RUB",
  from_city: "Bangkok, Thailand",
  to_city: "Phuket, Thailand"
}];

export default Ember.Route.extend({
  queryParams: {
    from: { refreshModel: true },
    to: { refreshModel: true }
  },
  model(params) {
    return routes;
  }
});
