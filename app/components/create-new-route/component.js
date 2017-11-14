import R from 'npm:ramda';
import Ember from 'ember';
import Route from '../../models/route';
import RSVP from 'rsvp';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  gMap: Ember.inject.service(),
  classNames: ['row'],
  classNameBindings: ['media.isMobile::bottom-split','media.isMobile::add-route-form'],
  errorMessage: null,
  locationsNumber: 2,
  currentStep: 1,
  children: Ember.A([]),
  showLoginModal: false,
  locations: Ember.A([]),
  countries: Ember.A([
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
  ]),
  init() {
    this._super(...arguments);
    this.resetLocations();
  },
  resetLocations() {
    this.set('locations', Ember.A(
      R.times((i) => ({
        country: null,
        city: null,
        address: null,
        geocodes: Ember.A([]),
        comment: null
      }), this.get('locationsNumber'))
    ));
  },
  locationChanged: Ember.observer('locations.@each.{country,city,address,comment}', function() {
    let locs = this.get('locations');

    // Add the info to the model
    this._setParamsToModel(locs[0], 'from');
    this._setParamsToModel(locs[1], 'to');
  }),
  _setParamsToModel(info, prefix) {
    this.set(`newRoute.${prefix}City`, this._getFormattedAddr(info, "city"));
    this.set(`newRoute.${prefix}Address`, this._getFormattedAddr(info, "address"));
    this.set(`newRoute.${prefix}Comment`, info.comment);

    if (info.address && info.address.geometry.location) {
      this.set(`newRoute.${prefix}Lat`, info.address.geometry.location.lat());
      this.set(`newRoute.${prefix}Lng`, info.address.geometry.location.lng());
    }
  },
  _getFormattedAddr(addr, prop) {
    if (addr && addr[prop] && addr[prop].formatted_address) {
      return addr[prop].formatted_address;
    }
    return null;
  },

  _authenticateUser() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('session.isAuthenticated')) {
        resolve();
      } else {
        this.set('showLoginModal', true);
        let loginForm = this.get('children')
              .find((item) => item.id === 'login-form').ref;
        loginForm.set('onSuccess', resolve);
      }
    });
  },
  actions: {
    submit(resolve, reject) {
      let route = this._validateRoute(this.get('newRoute'));
      this._authenticateUser().then(() => {
        this.get('createRoute')(route, resolve, reject);
      });
    },
    resetForm() {
      this.resetLocations();
      this.get('children').forEach((view) => {
        return view.ref.reset();
      });
      this.get('resetModel')();
      this.set('currentStep', 1);
      this.set('errorMessage', null);
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    },
    mapClicked(point) {
      // skip if the current thing doesn't have city or country yet
      this.get('gMap')
        .geocode({
          lat: point[0],
          lng: point[1],
          language: 'en'
        })
        .then((geocodes) => {
          //this.onMapClicked(geocodes, point);
          let loc = this.get(`locations.${this.get('currentStep') -1 }`);
          if (loc.country && loc.city) {
            this.set(
              `locations.${this.get('currentStep') -1 }.address`,
              this._getAddressFromGeocodes(geocodes, point)
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });


    },
    onCountryChanged(code) {
      this.get('gMap')
        .geocode({
          address: this.get('countries').find(
            (item) => item.value === code
          ).text
        })
        .then((geocodes) => {
          let loc = `locations.${this.get('currentStep') -1 }`;
          this.set(`${loc}.country`, geocodes[0]);
          this.set(`${loc}.city`, null);
        })
        .catch((err) => console.error(err));
    }
  },
  _validateRoute(route) {
    Route.eachAttribute(function(name) {
      if (route.get(name) === null || route.get(name) === undefined) {
        route.set(name, "");
      }
    });
    return route;
  },
  _getGeocodeItem(geocodes, itemName) {
    return geocodes.find((item) => item.types.includes(itemName));
  },
  _getAddressFromGeocodes(geocodes, point) {
    let addr = this._getGeocodeItem(geocodes, 'route')
      || this._getGeocodeItem(geocodes, 'street_address');
    if (addr && addr.geometry) {
      addr.geometry.location.lat = function() { return point[0]; }
      addr.geometry.location.lng = function() { return point[1]; }
    }
    return addr;
  }
});
