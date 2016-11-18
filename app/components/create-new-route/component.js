import Ember from 'ember';

export default Ember.Component.extend({
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
        comment: null
      });
    }
    return locations;
  },
  locationChanged: Ember.observer('locations.@each.{country,city,address,comment}', 'stepTwoLocation', function() {
    let locs = this.get('locations');

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
  }
});
