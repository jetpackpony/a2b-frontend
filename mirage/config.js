import Mirage from 'ember-cli-mirage';
import dump from '../mirage/api-dump';
import ENV from '../config/environment';

export default function() {
  this.namespace = ENV.a2b.apiEndPoint;

  this.get('/itineraries', function(schema, request) {
    console.log(request);
    let from = request.queryParams['filter[from]'];
    let to = request.queryParams['filter[to]'];
    if (from !== undefined && to !== undefined) {
      //return schema.itineraries.where({ fromCoords: from, toCoords: to });
      //return schema.itineraries.all();
      return dump();
    } else {
      return { data: [] };
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
    /*
    return {
      "error": "invalid_request",
      "error_description": "This is an error and it makes us very sad"
    };
    */
  }/*, 400*/);

  this.post('/users', function(schema, request) {
    console.log(request);
    const attrs = JSON.parse(request.requestBody);
    return { data: null };
  });

  // Pass it to the actual API
  this.passthrough('/itineraries', ['get']);
  this.passthrough('/routes', ['post']);
}
