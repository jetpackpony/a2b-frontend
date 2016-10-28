export default function() {
  this.namespace = '/api';

  this.get('/itineraries', function(schema, request) {
    let from = request.queryParams['filter[from]'];
    let to = request.queryParams['filter[to]'];
    if (from !== undefined && to !== undefined) {
      return schema.itineraries.where({ fromCity: from, toCity: to });
    } else {
      return { data: [] };
    }
  });

  this.post('/routes', function(schema, request) {
    const attrs = JSON.parse(request.requestBody);
    return schema.routes.create(attrs);
  });
}
