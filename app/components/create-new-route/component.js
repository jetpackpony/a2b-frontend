import R from 'npm:ramda';
import Ember from 'ember';
import RSVP from 'rsvp';
import gMapGeocodes from 'a2b/mixins/g-map-geocodes';

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

export default Ember.Component.extend(gMapGeocodes, {
  classNames: ['row'],
  classNameBindings: ['media.isMobile::bottom-split','media.isMobile::add-route-form'],

  session: Ember.inject.service(),

  errorMessage: null,
  currentStep: 1,
  showLoginModal: false,
  locations: getBlankLocations(locationsNumber),
  countries: Ember.A(countries),
  onLoginSuccess: () => {},
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
        this.getAddressByPoint(point)
          .then((address) =>
            this._getCurrentLocation().setProperties({ address })
          );
      }
    },
    onCountryChanged(code) {
      this.getCountryByName(this._getCountryByCode(code))
        .then((country) => ({
          country,
          city: null
        }))
        .then((props) =>
          this._getCurrentLocation().setProperties(props)
        );
    },
    onLoginSuccess() {
      this.get('onLoginSuccess')();
    },
    resetForm() {
      this._resetLocations();
      this.get('resetModel')();
      this.set('currentStep', 1);
      this.set('errorMessage', null);
    }
  },
  _getCountryByCode(code) {
    return this.get('countries').find(
      (item) => item.value === code
    ).text;
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
  }
});

// This is called at component creation, so need to be defined
// at the top of the file
function getBlankLocations(number) {
  return Ember.A(
    R.times((i) => Ember.Object.create({
      country: null,
      city: null,
      address: null,
      geocodes: Ember.A([]),
      comment: null
    }), number)
  )
};

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

