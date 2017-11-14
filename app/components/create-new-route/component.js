import R from 'npm:ramda';
import Ember from 'ember';
import RSVP from 'rsvp';

const locationsNumber = 2;
const countries = [
  { text: "Vietnam", value: "vn" },
  { text: "Cambodia", value: "kh" },
  { text: "Laos", value: "la" },
  { text: "Myanmar", value: "mm" },
  { text: "Thailand", value: "th" },
  { text: "Malaysia", value: "my" },
  { text: "Brunei", value: "bn" },
  { text: "East Timor", value: "tl" },
  { text: "Indonesia", value: "id" },
  { text: "Singapore", value: "sg" },
  { text: "Philippines", value: "ph" }
];

export default Ember.Component.extend({
  classNames: ['row'],
  classNameBindings: ['media.isMobile::bottom-split','media.isMobile::add-route-form'],

  session: Ember.inject.service(),
  gMap: Ember.inject.service(),

  errorMessage: null,
  currentStep: 1,
  children: Ember.A([]),
  showLoginModal: false,
  locations: Ember.A([]),
  countries: Ember.A(countries),
  onLoginSuccess: () => {},

  init() {
    this._super(...arguments);
    this._resetLocations();
  },

  onLocationChanged: Ember.observer('locations.@each.{country,city,address,comment}', function() {
    this.get('newRoute').setProperties(
      locationToModelProps(this.get('locations')[0], 'from'));
    this.get('newRoute').setProperties(
      locationToModelProps(this.get('locations')[1], 'to'));
  }),

  actions: {
    submit(success, failure) {
      this._authenticateUser().then(
        () => this.get('createRoute')(
          this.get('newRoute'),
          success,
          failure
        )
      );
    },
    mapClicked(point) {
      if (this._getCurrentLocation().country && this._getCurrentLocation().city) {
        this._getGeocode(
          {
            lat: point[0],
            lng: point[1],
            language: 'en'
          },
          (geocodes) => (
            this._getCurrentLocation().setProperties({
              address: getAddressFromGeocodes(geocodes, point)
            })
          ),
          (err) => console.error(err)
        );
      }
    },
    onCountryChanged(code) {
      this._getGeocode(
        {
          address: this.get('countries').find(
            (item) => item.value === code
          ).text
        },
        (geocodes) => (
          this._getCurrentLocation().setProperties({
            country: geocodes[0],
            city: null
          })
        ),
        (err) => console.error(err)
      );
    },
    onLoginSuccess() {
      this.get('onLoginSuccess')();
    },
    resetForm() {
      this._resetLocations();
      this.get('children').forEach((view) => {
        return view.ref.reset();
      });
      this.get('resetModel')();
      this.set('currentStep', 1);
      this.set('errorMessage', null);
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    }
  },
  _getCurrentLocation() {
    return this.get('locations.' + (this.get('currentStep') - 1));
  },
  _resetLocations() {
    this.set('locations', getBlankLocations(locationsNumber));
  },
  _authenticateUser() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('session.isAuthenticated')) {
        resolve();
      } else {
        this.set('onLoginSuccess', resolve);
        this.set('showLoginModal', true);
      }
    });
  },
  _getGeocode(params, success, failure) {
    this.get('gMap')
      .geocode(params)
      .then(success, failure);
  }
});

const getBlankLocations = (number) => (
  Ember.A(
    R.times((i) => Ember.Object.create({
      country: null,
      city: null,
      address: null,
      geocodes: Ember.A([]),
      comment: null
    }), number)
  )
);

const getFormattedAddr = (addr, prop) => (
  (addr && addr[prop] && addr[prop].formatted_address)
  ? addr[prop].formatted_address
  : null
);

const locationToModelProps = (loc, prefix) => (
  R.merge(
    {
      [`${prefix}City`]: getFormattedAddr(loc, "city"),
      [`${prefix}Address`]: getFormattedAddr(loc, "address"),
      [`${prefix}Comment`]: loc.comment
    },
    (loc.address && loc.address.geometry.location)
    ? {
      [`${prefix}Lat`]: loc.address.geometry.location.lat(),
      [`${prefix}Lng`]: loc.address.geometry.location.lng()
    }
    : {}
  )
);

const getGeocodeItem = (geocodes, itemName) => (
  geocodes.find((item) => item.types.includes(itemName))
);

const getAddressFromGeocodes = (geocodes, point) => (
  R.merge(
    (getGeocodeItem(geocodes, 'route')
      || getGeocodeItem(geocodes, 'street_address')),
    // Replace the coordinates by the ones user clicked on
    {
      geometry: {
        location: {
          lat: () => point[0],
          lng: () => point[1]
        }
      }
    }
  )
);
