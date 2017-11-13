import R from 'npm:ramda';
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
    this._focusOnLocations = R.compose(
      this._focusOnBounds.bind(this),
      locationsToBounds
    );
  },

  locationChanged: Ember.observer('locations.@each.{country,city,address,comment}', function() {
    this.set('lines', createLines(this._getAddresses()));
    this.set('markers', createMarkers(this._getAddresses()));
    this._updateMap();
  }),
  currentStepChanged: Ember.observer('currentStep', function() {
    this._updateMap();
  }),

  _updateMap() {
    // Move the center to a point or bounds
    this._focusOnLocations(this._getVisibleLocations());

    // Change zoom level
    this.set('zoom', calculateZoom(this._getCurrentLocation(), this.get('zoom')));

    // Change cursor shape
    this.set('cursor',
      (this._isAtFinalStep() || !this._getCurrentLocation().city)
      ? dragCursor
      : pointCursor
    );
  },
  _focusOnBounds(bounds) {
    return (bounds.length > 1)
      ? this.set('bounds', bounds)
      : this.set('center', bounds[0]);
  },
  _isAtFinalStep() {
    return this.get('currentStep') > this.get('locations').length;
  },
  _getVisibleLocations() {
    // If this is the last step, return all the locations,
    // otherwise return the current one
    return (this._isAtFinalStep())
      ? this.get('locations')
      : [this._getCurrentLocation()];
  },
  _getCurrentLocation() {
    return this.get('locations')[this.get('currentStep') - 1];
  },
  _getAddresses() {
    return this.get('locations').mapBy('address').compact();
  },
  actions: {
    mapClicked(point) {
      this.get('mapClicked')(point);
    }
  }
});

const getViewportBounds = (viewport) => ([
  [viewport.getNorthEast().lat(), viewport.getNorthEast().lng()],
  [viewport.getSouthWest().lat(), viewport.getSouthWest().lng()]
]);

const getAddressBounds = (address) => ([[
  address.geometry.location.lat(),
  address.geometry.location.lng()
]]);

const locationsToBounds = R.reduce((bounds, loc) => (
  (loc.address)
  ? bounds.concat(getAddressBounds(loc.address))
  : ((loc.city || loc.country)
    ? bounds.concat(getViewportBounds((loc.city || loc.country).geometry.viewport))
    : R.append([asia.lat, asia.lng], bounds))
), []);

const calculateZoom = (location, currentZoom) => (
  (!location)
  ? currentZoom
  : ((location.address && currentZoom < 12)
    ? 12
    : ((!location.address && !location.city && !location.country)
      ? asia.zoom
      : currentZoom))
);

const createSelectedLine = (prevAddress, currentAddress) => ({
  id: `${prevAddress.formatted_address}-${currentAddress.formatted_address}`,
  from: [
    prevAddress.geometry.location.lat(),
    prevAddress.geometry.location.lng()
  ],
  to: [
    currentAddress.geometry.location.lat(),
    currentAddress.geometry.location.lng()
  ],
  style: 'selected'
});

const createLines = (addresses) => (
  Ember.A(
    addresses.reduce((lines, addr, index, array) => (
      // If this is at least second address in the array,
      // add a line between it and previous one,
      // otherwise do thing
      (array[index - 1])
      ? R.append(
        createSelectedLine(array[index - 1], addr),
        lines
      )
      : lines
    ), [])
  )
);

const createMarkers = (addresses) => (
  Ember.A(
    addresses.map((addr) => ({
      id: `${addr.formatted_address}`,
      coords: [addr.geometry.location.lat(), addr.geometry.location.lng()],
      style: 'selected',
      title: addr.formatted_address
    }))
  )
);

