import DS from 'ember-data';

const putRoutesInOrder = function(order, items) {
  let res = order.map((routeId) => {
    return items.find((route) => route.id === routeId);
  });
  return res;
};

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (Array.isArray(payload.data)) {
      payload.data = payload.data.map((item) => {
        item.relationships.routes.data = putRoutesInOrder(
          item.id.split('-'),
          item.relationships.routes.data
        );
        return item;
      });
    }

    return this._super(...arguments);
  }
});
