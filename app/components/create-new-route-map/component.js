import Ember from 'ember';

const asia = {
  lat: 15,
  lng: 100,
  zoom: 4
};
const dragCursor = 'hand';
const pointCursor = 'cell';

export default Ember.Component.extend({
  classNames: ['create-new-map'],
  markers: Ember.A([]),
  lines: Ember.A([]),
  bounds: Ember.A([]),
  center: [asia.lat, asia.lng],
  zoom: asia.zoom,
  cursor: dragCursor,
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  reset() {
    this.set('markers', Ember.A([]));
    this.set('lines', Ember.A([]));
    this.set('bounds', Ember.A([]));
    this.set('center', [asia.lat, asia.lng]);
    this.set('zoom', asia.zoom);
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
  }),
  currentStepChanged: Ember.observer('currentStep', function() {
    this._focusMap();
  }),
  _focusMap() {
    let step = this.get('currentStep');
    let locs = this.get('locations');
    // if step is more than number of addresses, zoom out to whole picture
    if (step > this.get('locations').length) {
      this.set('bounds', locs.map((loc) => {
          let place = (loc.address || loc.city || loc.country);
          if (place) {
            return [place.geometry.location.lat(), place.geometry.location.lng()];
          } else {
            return [asia.lat, asia.lng];
          }
        })
      );
      this.set('cursor', dragCursor);
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

      // If city is set, change the cursor
      if (loc.city) {
        this.set('cursor', pointCursor);
      } else {
        this.set('cursor', dragCursor);
      }
    }
  },
  actions: {
    mapClicked(point) {
      this.get('mapClicked')(point);
    }
  }
});
