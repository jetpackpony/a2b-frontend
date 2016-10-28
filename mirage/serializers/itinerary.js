import BaseSerializer from './application';
const { dasherize } = Ember.String;

let getRouteIDsFor = function(itinerary) {
  return itinerary.relationships["itinerary-routes"].data.map((itiRo) => {
    return {
      type: 'routes',
      id: this.registry.schema.itineraryRoutes.find(itiRo.id).routeId
    };
  });
};

let getRouteByID = function(routeId) {
  let attrs = this.registry.schema.routes.find(routeId).attrs;
  return {
    id: routeId,
    type: "routes",
    attributes: Object.keys(attrs).reduce((hash, key) => {
      if (key === 'id') return hash; // skip id attribute
      hash[dasherize(key)] = attrs[key];
      return hash;
    }, {})
  };
};

export default BaseSerializer.extend({
  include: ['routes'],
  serialize(response, request) {
    let json = BaseSerializer.prototype.serialize.apply(this, [response, request]);
    let people = json.data;
    let include = this.include.includes('routes');
    if (!Array.isArray(people)) {
      people = [people];
    }

    if (include) {
      json.included = [];
    }
    people.forEach((itinerary) => {
      itinerary.relationships.routes = {
        data: getRouteIDsFor.call(this, itinerary)
      };
      if (include) {
        json.included = json.included.concat(
            itinerary.relationships.routes.data.map((route) => {
              return getRouteByID.call(this, route.id);
            })
            );
      }
    });

    return json;
  }
});
