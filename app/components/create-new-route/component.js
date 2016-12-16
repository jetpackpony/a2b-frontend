import Ember from 'ember';
import Route from '../../models/route';
import RSVP from 'rsvp';

export default Ember.Component.extend({
  _gMap: Ember.inject.service('gMap'),
  classNames: ['row', 'bottom-split', 'add-route-form'],
  complete: false,
  errorMessage: null,
  locationsNumber: 2,
  currentStep: 1,
  children: Ember.A([]),
  locations: Ember.computed('locationsNumber', function() {
    return this.resetLocations();
  }),
  resetLocations() {
    let locations = Ember.A([]);
    for (let i = 0; i < this.get('locationsNumber'); i++) {
      locations.pushObject({
        country: null,
        city: null,
        address: null,
        geocodes: Ember.A([]),
        comment: null
      });
    }
    return locations;
  },
  locationChanged: Ember.observer('locations.@each.{country,city,address,comment}', 'stepTwoLocation', function() {
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

  didInsertElement() {
    this.$('.carousel').carousel({
      interval: false,
      wrap: false,
      keyboard: false
    });
  },
  actions: {
    next() {
      this.incrementProperty('currentStep');
      this.$('.carousel').carousel('next');
    },
    back() {
      this.decrementProperty('currentStep');
      this.$('.carousel').carousel('prev');
    },
    submit() {
      this._loadGeocodes().then(() => {
        this.get('createRoute')(
          this._validateRoute(this.get('newRoute')),
          () => {
            this.send('next');
            this.set('complete', true);
          },
          (error) => {
            this.send('next');
            this.set('complete', true);
          }
        );
      });
    },
    resetForm() {
      this.set('locations', this.resetLocations());
      this.get('children').forEach((view) => {
        return view.ref.reset();
      });
      this.get('resetModel')();
      this.set('complete', false);
      this.set('currentStep', 1);
      this.$('.carousel').carousel(0);
      this.set('errorMessage', null);
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    }
  },
  _loadGeocodes() {
    let skip = ['street_address', 'route', 'country'];
    return RSVP.all(this.get('locations').map((loc) => {
      if (loc.address && loc.address.geometry.location) {
        return this.get('_gMap').geocode({
          lat: loc.address.geometry.location.lat(),
          lng: loc.address.geometry.location.lng(),
          language: 'en'
        })
        .then((geocodes) => {
          Ember.set(loc, 'geocodes', geocodes.filter((item) => {
            return !item.types.includes('street_address') && !item.types.includes('country');
          }).map((item) => {
            return {
              "place_id": item.place_id,
              "name": item.formatted_address
            }
          }));
        });
      } else {
        return RSVP.resolve(loc);
      }
    })).then(() => {
      let locs = this.get('locations');
      this.set(`newRoute.from-locations`, locs[0].geocodes);
      this.set(`newRoute.to-locations`, locs[1].geocodes);
    });
  },
  _validateRoute(route) {
    Route.eachAttribute(function(name) {
      if (route.get(name) === null || route.get(name) === undefined) {
        route.set(name, "");
      }
    });
    return route;
  }
});
