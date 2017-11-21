import Mirage from 'ember-cli-mirage';
import ENV from '../config/environment';
import getSessionResponse from './sessionResponse';
import dump from './api-dump';

export default function() {
  this.namespace = ENV.a2b.apiEndPoint;

  // Searching itineraries
  this.get('/itineraries', (schema, request) => {
    let from = request.queryParams['filter[from]'];
    let to = request.queryParams['filter[to]'];
    return (from && to)
      ? dump()
      : makeError(200);
  });

  // Add route
  this.post('/routes', ({ routes }, { requestBody }) => (
    routes.create(JSON.parse(requestBody))
  ));

  // Create a user session
  this.post('/session/create', getSessionResponse);

  // Create a user record on the server
  this.post('/users', (schema, request) => ({
    data: null
  }));

  // Search locations
  this.get('/locations', ({ locations }, { queryParams }) => (
    filterLocationsByName(
      queryParams['filter[name]'].toLowerCase(),
      locations
    )
  ));

  // Get location by ID
  this.get('/locations/:id', ({ locations }, { params }) => (
    locations.find(params.id) || makeError(400)
  ));

  // Pass it to the actual API
  /*
  this.passthrough('/itineraries', ['get']);
  this.passthrough('/locations', ['get']);
  this.passthrough('/locations/:id', ['get']);
  this.passthrough('/routes', ['post']);
  this.passthrough('/users', ['post']);
  this.passthrough('/session/create', ['post']);
  */
  this.passthrough('https://mc.yandex.ru/**');
}

const makeError = (code) => (
  new Mirage.Response(code, {}, {
    "errors": [
      { "detail":"java.lang.IllegalStateException" }
    ]
  })
);

const filterLocationsByName = (name, locations) => (
  locations.all().filter(
    (item) => (
      item.name.toLowerCase().indexOf(name) !== -1
    )
  )
);

