import Ember from 'ember';

let asia = {
  lat: 15,
  lng: 100,
  zoom: 4
};

export default Ember.Component.extend({
  classNames: ['row', 'bottom-split', 'add-route-form'],
  complete: false,
  errorMessage: null,
  markers: Ember.A([]),
  lines: Ember.A([]),
  bounds: Ember.A([]),
  center: [asia.lat, asia.lng],
  zoom: asia.zoom,
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
        comment: null
      });
    }
    return locations;
  },
  locationChanged: Ember.observer('locations.@each.{country,city,address,comment}', 'stepTwoLocation', function() {
    let locs = this.get('locations');
    let addrs = locs.mapBy('address').compact();

    // if more than one address, draw lines between them
    this.set('lines', Ember.A([]));
    if (addrs.length > 1) {
      let prev = null;
      addrs.forEach((addr) => {
        if (prev) {
          this.get('lines').pushObject({
            id: `${prev.formatted_address}-${addr.formatted_address}`,
            from: [prev.geometry.location.lat(), prev.geometry.location.lng()],
            to: [addr.geometry.location.lat(), addr.geometry.location.lng()],
            style: 'selected'
          });
        }
        prev = addr;
      });
    }

    // draw markers for every set address
    this.set('markers', Ember.A([]));
    addrs.forEach((addr) => {
      this.get('markers').pushObject({
        id: `${addr.formatted_address}`,
        coords: [addr.geometry.location.lat(), addr.geometry.location.lng()],
        style: 'selected',
        title: addr.formatted_address
      });
    });

    // Focus the map
    this._focusMap();

    // Add the info to the model
    this.set('newRoute.fromCity', this._getFormattedAddr(locs[0], "city"));
    this.set('newRoute.fromAddress', this._getFormattedAddr(locs[0], "address"));
    this.set('newRoute.fromCoords', this._getCoords(locs[0].address).join(', '));
    this.set('newRoute.fromComment', locs[0].comment);

    this.set('newRoute.toCity', this._getFormattedAddr(locs[1], "city"));
    this.set('newRoute.toAddress', this._getFormattedAddr(locs[1], "address"));
    this.set('newRoute.toCoords', this._getCoords(locs[1].address).join(', '));
    this.set('newRoute.toComment', locs[1].comment);
  }),
  currentStepChanged: Ember.observer('currentStep', function() {
    this._focusMap();
  }),
  _getCoords(addr) {
    if (addr && addr.geometry.location) {
      return [addr.geometry.location.lat(), addr.geometry.location.lng()];
    }
    return [];
  },
  _getFormattedAddr(addr, prop) {
    if (addr && addr[prop] && addr[prop].formatted_address) {
      return addr[prop].formatted_address;
    }
    return null;
  },
  _focusMap() {
    let step = this.get('currentStep');
    let locs = this.get('locations');
    // if step is more than number of addresses, zoom out to whole picture
    if (step > this.get('locationsNumber')) {
      this.set('bounds', locs.map((loc) => {
          let place = (loc.address || loc.city || loc.country);
          if (place) {
            return [place.geometry.location.lat(), place.geometry.location.lng()];
          } else {
            return [asia.lat, asia.lng];
          }
        })
      );
    } else {
      // else focus on the current step-point
      let loc = locs[step - 1];
      let place;

      // If address is there, focus on it's point
      if (loc.address) {
        let point = loc.address.geometry.location;
        this.set('center', [point.lat(), point.lng()]);
        // If the zoom is too far, come closer
        if (this.get('zoom') < 12) {
          this.set('zoom', 12);
        }
      } else if (place = loc.city || loc.country) {
        let bounds = place.geometry.viewport;
        this.set('bounds', Ember.A([
          [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()],
          [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()]
        ]));
      } else {
        this.set('center', [asia.lat, asia.lng]);
        this.set('zoom', asia.zoom);
      }
    }
  },
  _handleClick(addr) {
    let step = this.get('currentStep');
    let locs = this.get('locations');
    let loc = locs[step - 1];
    if (loc.country && loc.city) {
      Ember.set(loc, 'address', addr);
    }
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
      this.get('createRoute')(
          this.get('newRoute'),
          () => {
            this.send('next');
            this.set('complete', true);
          },
          (error) => {
            this.send('next');
            this.set('complete', true);
          }
      );
    },
    resetForm() {
      this.set('locations', this.resetLocations());
      this.set('markers', Ember.A([]));
      this.set('lines', Ember.A([]));
      this.set('bounds', Ember.A([]));
      this.set('center', [asia.lat, asia.lng]);
      this.set('zoom', asia.zoom);
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
    },
    mapClicked(geocodes, point) {
      let addr = geocodes.find((item) => item.types.includes('route'))
        || geocodes.find((item) => item.types.includes('street_address'));
      if (addr) {
        addr.geometry.location.lat = function() { return point[0]; }
        addr.geometry.location.lng = function() { return point[1]; }
        this._handleClick(addr);
      } else {
        console.log("Couldn't find geocode", geocodes);
      }
      //geocodes.find((item) => item.types.includes('locality'))
    }
  }
});
