const times = x=> f=> {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

const maxItineraries = 10;
const maxRoutes = 3;

export default function(server) {

  let from = { city: "Bangkok, Thailand", coords: "13.7563, 100.5018" };
  let to = { city: "Phuket, Thailand", coords: "7.8804, 98.3922" };

  times(maxItineraries)(() => {
    let itinerary = server.create('itinerary');
    let routesNumber = Math.floor(Math.random() * (maxRoutes - 1)) + 1;
    let routes = [];

    times(routesNumber)(() => {
      let route = null;
      let coords = {};
      if (routes.length === routesNumber - 1) {
        coords.toCity = to.city;
        coords.toCoords = to.coords;
      }
      if (routes.length > 0) {
        let prev = routes[routes.length - 1];
        coords.fromCity = prev.toCity;
        coords.fromCoords = prev.toCoords;
      } else {
        coords.fromCity = from.city;
        coords.fromCoords = from.coords;
      }
      route = server.create('route', coords);
      routes.push(route);
      server.create('itinerary-route', { itinerary, route });
    });
  });
}
