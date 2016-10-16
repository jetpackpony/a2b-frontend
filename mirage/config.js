export default function() {
  this.namespace = '/api';

  let routes = [
    {
      id: "1",
      type: "routes",
      attributes: {
        title: "Bus Siam Tour",
        description: "A very fast bus also so cheap",
        price: "300-400 RUB",
        from_city: "Bangkok, Thailand",
        to_city: "Phuket, Thailand"
      }
    }, {
      id: "2",
      type: "routes",
      attributes: {
        title: "Ferry Siam Tour",
        description: "A very fast bus also so cheap",
        price: "3300-5400 RUB",
        from_city: "Bangkok, Thailand",
        to_city: "Phuket, Thailand"
      }
    }, {
      id: "3",
      type: "routes",
      attributes: {
        title: "Train Ololo Tour",
        description: "A very fast bus also so cheap",
        price: "300-400 RUB",
        from_city: "Bangkok, Thailand",
        to_city: "Phuket, Thailand"
      }
    }
  ];

  this.get('/routes', function(schema, request) {
    if (request.queryParams.from !== undefined &&
        request.queryParams.to !== undefined) {
      return {
        data: routes.filter(function(x) {
          return x.attributes.from_city === request.queryParams.from &&
            x.attributes.to_city === request.queryParams.to;
        })
      };
    } else {
      return { data: [] };
    }
  });

  this.get('/routes/:id', function(schema, request) {
    return { data: routes.find((x) => x.id === request.params.id) };
  });
}
