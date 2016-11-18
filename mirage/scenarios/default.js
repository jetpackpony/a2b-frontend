const times = x=> f=> {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

const maxItineraries = 10;
const maxRoutes = 3;

export default function(server) {

  let from = { fromCity: "Bangkok, Thailand", fromCoords: "13.7563, 100.5018" };
  let to = { toCity: "Phuket, Thailand", toCoords: "7.8804, 98.3922" };

  times(maxItineraries)(() => {
    let itinerary = server.create('itinerary');
    let routesNumber = Math.floor(Math.random() * (maxRoutes + 1)) + 1;
    let routes = [];

    times(routesNumber)(() => {
      let route = null;
      if (routes.length > 0) {
        let prev = routes[routes.length - 1];
        let coords = {
          fromCity: prev.toCity,
          fromCoords: prev.toCoords
        };
        if (routes.length === routesNumber - 1) {
          coords.toCity = to.toCity;
          coords.toCoords = to.toCoords;
        }
        route = server.create('route', coords);
      } else {
        route = server.create('route', from);
      }
      routes.push(route);
      server.create('itinerary-route', { itinerary, route });
    });
  });
}
