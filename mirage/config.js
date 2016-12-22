import Mirage from 'ember-cli-mirage';
import dump from '../mirage/api-dump';
import ENV from '../config/environment';

export default function() {
  this.namespace = ENV.a2b.apiEndPoint;

  this.get('/itineraries', function(schema, request) {
    console.log(request);
    let from = request.queryParams['filter[from]'];
    let to = request.queryParams['filter[to]'];
    if (from && to) {
      return dump();
    } else {
      return new Mirage.Response(200, {}, {
        "errors": [
          { "detail":"java.lang.IllegalStateException" }
        ]
      });
    }
  });

  this.post('/routes', function(schema, request) {
    console.log(request);
    const attrs = JSON.parse(request.requestBody);
    return schema.routes.create(attrs);
    //return new Mirage.Response(400, {}, 'some server error');
  });

  this.post('/session/create', function(schema, request) {
    console.log(request);
    return {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlc3RtZUBnbWFpbC5jb20ifQ.36IvcD5fisgSmPxGDbtuAZF3nSeBxX2xEy4vnQTa18E",
      "token_type":"JWT",
      "expires_in":3600
    };
  });

  this.post('/users', function(schema, request) {
    console.log(request);
    const attrs = JSON.parse(request.requestBody);
    return { data: null };
  });

  this.get('/locations', function(schema, request) {
    let name = request.queryParams['filter[name]'].toLowerCase();
    if (name) {
      return schema.locations.all().filter((item) => {
        return item.name.toLowerCase().indexOf(name) !== -1;
      });
    } else {
      return new Mirage.Response(400, {}, {
        "errors": [
          { "detail":"java.lang.IllegalStateException" }
        ]
      });
    }
  });

  // Pass it to the actual API
  this.passthrough('/itineraries', ['get']);
  this.passthrough('/locations', ['get']);
  /*
  this.passthrough('/routes', ['post']);
  this.passthrough('/users', ['post']);
  this.passthrough('/session/create', ['post']);
  */
}
