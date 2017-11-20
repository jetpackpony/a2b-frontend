import R from 'npm:ramda';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(
      store,
      primaryModelClass,
      // Sort routes inside itinerary in proper order
      R.merge(payload, {
        data: sortRouteInItineraries(payload.data)
      }),
      id,
      requestType
    );
  }
});

const itineraryRoutesLens =
  R.lensPath(['relationships', 'routes', 'data']);

const sortRouteInItineraries = (data) => (
  (Array.isArray(data))
  ? data.map((itinerary) => (
    R.over(
      itineraryRoutesLens,
      putRoutesInOrder(getRouteOrder(itinerary)),
      itinerary
    )
  ))
  : data
);

const getRouteOrder = (itinerary) => (
  itinerary.id.split('-')
);

const putRoutesInOrder = R.curry((order, items) => (
  order.map((routeId) => (
    items.find((route) => route.id === routeId)
  ))
));
