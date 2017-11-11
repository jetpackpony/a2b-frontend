import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  /*
   * Array of lines
   * [{
   *   id: 'for-reference',
   *   from: [123, 1231],
   *   to: [213, 123],
   *   style: 'dimmed|normal|selected', // dimmed is default
   * }]
   *
   */
  lines: Ember.A([]),

  /* Array of markers
   * [{
   *   id: 'for-reference',
   *   coords: [123, 3123],
   *   style: 'dimmed|normal|selected', // dimmed is default
   *   title: "this is a title"
   * }]
   */
  markers: Ember.A([]),

  /*
   * Array of coordinates:
   * Ember.A([
   *   [123, 123],
   *   [123, 123],
   *   [123, 123]
   * ])
   */
  bounds: null,

  /*
   * Coordinates to center the map on
   */
  center: [15, 100],
  zoom: 4,

  /*
   * mapClicked - action called with coordinates of the click
   */
  mapClicked: () => {},

  /*
   * "cell|pointer|hand|...."
   */
  cursorShape: 'hand',


  /*
   * Converts lines array into line objects google map can understand
   */
  gMapsLines: Ember.computed('lines.@each.{from,to,style}', function() {
    return Ember.A(
      this.get('lines').map(line =>
        R.merge(
          {
            id: line.id,
            path: [ line.from, line.to ],
            clickable: true,
            editable: false,
            geodesic: true,
            visible: true,
            strokeColor: mapColors[line.style],
            zIndex: 1
          },
          lineStyles[line.style]
        )
      )
    );
  }),

  /*
   * Converts markers array into marker objects google map can understand
   */
  gMapsMarkers: Ember.computed('markers.[]', function() {
    return Ember.A(
      this.get('markers').map(marker => ({
        id: marker.id,
        lat: marker.coords[0],
        lng: marker.coords[1],
        infoWindow: { content: marker.title },
        zIndex: lineStyles[marker.style].zIndex + 1,
        icon: R.merge(
          {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: mapColors[marker.style],
            strokeWeight: 2,
            fillColor: "white",
            fillOpacity: 1
          },
          markerStyles[marker.style]
        )
      }))
    );
  }),

  boundsChanged: Ember.observer('bounds', function() {
    this._zoomToBounds();
  }),

  cursorChanged: Ember.observer('cursorShape', function() {
    this._setCursor();
  }),

  classNames: ['gmaps-wrapper'],
  actions: {
    mapLoaded() {
      this._setCursor();
      this._zoomToBounds();
    },
    mapClicked(e) {
      this.get('mapClicked')([e.latLng.lat(), e.latLng.lng()]);
    }
  },

  _gMap: Ember.inject.service('gMap'),
  _setCursor() {
    this.get('_gMap').maps.select('map')
      .map.setOptions({ draggableCursor: this.get('cursorShape') });
  },
  _zoomToBounds() {
    let gBounds = converToGoogleBounds(this.get('bounds'));
    if (!gBounds.isEmpty()) {
      this.get('_gMap').maps.select('map').map.fitBounds(gBounds);
    }
  }
});

const converToGoogleBounds = (bounds) =>
  bounds.reduce((b, point) =>
    b.extend({lat: point[0], lng: point[1]}),
    new google.maps.LatLngBounds()
  );

const mapColors = {
  dimmed: 'grey',
  normal: '#2c9bba',
  selected: '#f94572'
};

const lineStyles = {
  dimmed: {
    strokeOpacity: 0.7,
    strokeWeight: 1,
    zIndex: 1
  },
  normal: {
    strokeOpacity: 1,
    strokeWeight: 3,
    zIndex: 3
  },
  selected: {
    strokeOpacity: 1,
    strokeWeight: 3,
    zIndex: 5
  }
};

const markerStyles = {
  dimmed: {
    strokeOpacity: 0.7,
    scale: 5,
  },
  normal: {
    strokeOpacity: 1,
    scale: 7,
  },
  selected: {
    strokeOpacity: 1,
    scale: 7,
  }
};

