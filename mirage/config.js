export default function() {
  this.namespace = '/api';

  this.get('/routes', function(schema, request) {
    if (request.queryParams.from === "Bangkok, Thailand" &&
        request.queryParams.to === "Phuket, Thailand") {
      return {
        data: [
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
        ]
      };
    } else {
      return { data: [] };
    }
  });
}
