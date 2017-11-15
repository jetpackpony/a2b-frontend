import Ember from 'ember';
import Route from '../../models/route';

const transportTypes = ["Bus", "Ferry", "Train"];

export default Ember.Component.extend({
  transportTypeFieldValues: Ember.A(transportTypes),
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

  showOtherTransportField: Ember.computed('newRoute.transportType', {
    get() {
      return !!this.get('newRoute.transportType') &&
        transportTypes.indexOf(this.get('newRoute.transportType')) === -1;
    },
    set(key, value) {
      return value;
    }
  }),
  transportTypeEmpty: Ember.computed(
    'newRoute.transportType',
    'showOtherTransportField',
    function() {
      return !this.get('newRoute.transportType')
        && !this.get('showOtherTransportField');
    }
  ),

  durationHours: Ember.computed('newRoute.duration', {
    get() {
      return getHours(this.get('newRoute.duration'));
    },
    set(key, value) {
      this.set('newRoute.duration',
        addHours(this.get('newRoute.duration'), value));
      return value;
    }
  }),
  durationMinutes: Ember.computed('newRoute.duration', {
    get() {
      return getMinutes(this.get('newRoute.duration'));
    },
    set(key, value) {
      this.set('newRoute.duration',
        addMinutes(this.get('newRoute.duration'), value));
      return value;
    }
  }),

  actions: {
    submit() {
      this.get('submit')();
    },
    transportTypeChanged() {
      (event.target.value === 'Other')
        ? (
          this.set('newRoute.transportType', ""),
          this.set('showOtherTransportField', true)
        )
        : this.set('newRoute.transportType', event.target.value);
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
  (route.get('transportType') && route.get('organization')
    && route.get('duration') && route.get('price')
    && route.get('description') && isRouteLocationsSet(route))
);

const isAddressAdded = (route, prefix) => (
  (route.get(`${prefix}Lat`) && route.get(`${prefix}Lat`))
  || route.get(`${prefix}Comment`)
)

const isRouteLocationsSet = (route) => (
  isAddressAdded(route, 'from') && isAddressAdded(route, 'to')
);

const getHours = (time) => (
  (time)
  ? Math.floor(time)
  : null
);

const getMinutes = (time) => (
  (time)
  ? Math.round((time % 1) * 60)
  : null
);

const addHours = (time, hours) => (
  ((time || 0) % 1) + parseInt(hours)
);

const addMinutes = (time, minutes) => (
  Math.floor(time || 0) + parseInt(minutes || 0) / 60
);

