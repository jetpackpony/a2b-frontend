import BaseSerializer from './application';
const { dasherize } = Ember.String;

export default BaseSerializer.extend({

  serialize(response, request) {
    let json = BaseSerializer.prototype.serialize.apply(this, [response, request]);

    json.included = [];
    json.data.forEach((iti) => {
      iti.relationships.routes = { data: [] };
      iti.relationships["itinerary-routes"].data.forEach((itRo) => {
        // Add route to relationships
        let routeId = this.registry.schema.itineraryRoutes.find(itRo.id).routeId;
        let route = this.registry.schema.routes.find(routeId);
        iti.relationships.routes.data.push({
          type: 'routes',
          id: routeId
        });

        // Add routes to included instances
        let newRoute = {};
        for(let key in route.attrs) {
          newRoute[dasherize(key)] = route.attrs[key];
        }
        delete(newRoute.id);
        json.included.push({
          id: routeId,
          type: "routes",
          attributes: newRoute
        });
      });
    });

    return json;
  }
});
