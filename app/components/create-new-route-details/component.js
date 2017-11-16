import Ember from 'ember';
import Route from '../../models/route';

export default Ember.Component.extend({
  newRoute: null,
  init() {
    this._super(...arguments);
    // Generate a computed property which watches all parameters
    // of the model changes
    Ember.defineProperty(
      this,
      'showSubmitButton',
      Ember.computed(
        `newRoute.{${getAttributeNames(Route).mapBy('name').join(',')}}`,
        function() {
          return isRouteComplete(this.get('newRoute'));
        })
    );
  },
  actions: {
    submit() {
      this.get('submit')();
    },
    back() {
      this.get('back')();
    }
  }
});

const getAttributeNames = (model) => {
  let attrs = [];
  Ember.get(model, 'attributes').forEach((name) => attrs.push(name));
  return attrs;
};

const isRouteComplete = (route) => (
  route.get('transportType') && route.get('organization')
  && route.get('duration') && route.get('price')
  && route.get('description') && isRouteLocationsSet(route)
);

const isRouteLocationsSet = (route) => (
  isAddressAdded(route, 'from') && isAddressAdded(route, 'to')
);

const isAddressAdded = (route, prefix) => (
  (route.get(`${prefix}Lat`) && route.get(`${prefix}Lat`))
  || route.get(`${prefix}Comment`)
);

