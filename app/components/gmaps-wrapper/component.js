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
  center: [15, 100],
  zoom: 4,
  mapClicked: () => {},
  cursorShape: 'hand',


  /*
   * Converts lines array into line objects google map can understand
   */
  gMapsLines: Ember.computed('lines.@each.{from,to,style}', function() {
    return calcGMapsLines(this.get('lines'));
  }),

  /*
   * Converts markers array into marker objects google map can understand
   */
  gMapsMarkers: Ember.computed('markers.[]', function() {
    return calcGMapsMarkers(this.get('markers'));
  }),

  onBoundsChange: Ember.observer('bounds', function() {
    this.zoomToBounds();
  }),
  onCursorChange: Ember.observer('cursorShape', function() {
    this.setCursor();
  }),

  classNames: ['gmaps-wrapper'],
  actions: {
    mapLoaded() {
      this.setCursor();
      this.zoomToBounds();
    },
    mapClicked(e) {
      this.get('mapClicked')([e.latLng.lat(), e.latLng.lng()]);
    }
  },
  gMap: Ember.inject.service('gMap'),
  setCursor() {
    this.get('gMap').maps.select('map')
      .map.setOptions({ draggableCursor: this.get('cursorShape') });
  },
  zoomToBounds() {
    let gBounds = converToGoogleBounds(this.get('bounds'));
    if (!gBounds.isEmpty()) {
      this.get('gMap').maps.select('map').map.fitBounds(gBounds);
    }
  }
});

const converToGoogleBounds = (bounds) =>
  bounds.reduce((b, point) =>
    b.extend({lat: point[0], lng: point[1]}),
    new google.maps.LatLngBounds()
  );

const calcGMapsLines = (lines) => (
  Ember.A(
    lines.map(line =>
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
  )
);

const calcGMapsMarkers = (markers) => (
  Ember.A(
    markers.map(marker => ({
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
  )
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

