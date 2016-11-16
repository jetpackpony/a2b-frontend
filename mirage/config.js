export default function() {
  this.namespace = '/api';

  this.get('/itineraries', function(schema, request) {
    console.log(request);
    let from = request.queryParams['filter[from]'];
    let to = request.queryParams['filter[to]'];
    if (from !== undefined && to !== undefined) {
      return schema.itineraries.where({ fromCity: from, toCity: to });
    } else {
      return { data: [] };
    }
  });

  this.post('/routes', function(schema, request) {
    console.log(request);
    const attrs = JSON.parse(request.requestBody);
    return schema.routes.create(attrs);
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
    return { data: [] };
  });
}
