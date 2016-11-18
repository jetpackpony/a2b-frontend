import Ember from 'ember';

let mapColors = {
  dimmed: 'grey',
  normal: '#2c9bba',
  selected: '#f94572'
};

let lineStyles = {
  dimmed: {
    strokeOpacity: 0.7,
    strokeWeight: 3,
    zIndex: 1
  },
  normal: {
    strokeOpacity: 1,
    strokeWeight: 5,
    zIndex: 3
  },
  selected: {
    strokeOpacity: 1,
    strokeWeight: 5,
    zIndex: 5
  }
};

let markerStyles = {
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

export default Ember.Component.extend({
  // Public options
  /*
   * {
   *   id: 'for-reference',
   *   from: [123, 1231],
   *   to: [213, 123],
   *   style: 'dimmed|normal|selected', // dimmed is default
   *   markers: {                       // optional
   *     titles: {
   *       from: "From message",
   *       to: "to message"
   *     }
   *   }
   * }
   *
   */
  lines: Ember.A([]),

  /*
   * {
   *   id: 'for-reference',
   *   coords: [123, 3123],
   *   style: 'dimmed|normal|selected', // dimmed is default
   *   title: "this is a title"
   * }
   */
  markers: Ember.A([]),

  /*
   * Ember.A([
   *   [123, 123],
   *   [123, 123],
   *   [123, 123]
   * ])
   */
  bounds: null,

  /*
   * [123, 123]
   */
  center: [15, 100],
  zoom: 4,

  /*
   * mapClicked - action called with coordinates of the click
   */
  mapClicked: null,

  /*
   * "cell|pointer|hand|...."
   */
  draggableCursor: 'hand',



  /*
   * Observers and computed
   */
  _polylines: Ember.computed('lines.@each.{from,to,style,markers}', function() {
    let lines = Ember.A([]);
    let markers = Ember.A([]);
    this.get('lines').forEach((line) => {
      lines.pushObject(this._makeLine({
        id: line.id,
        from: line.from,
        to: line.to,
        style: line.style
      }));

      if (line.markers && line.markers.titles) {
        markers.pushObject({
          id: `${line.id}-from`,
          coords: line.from,
          style: line.style,
          title: line.markers.titles.from
        });
        markers.pushObject({
          id: `${line.id}-to`,
          coords: line.to,
          style: line.style,
          title: line.markers.titles.to
        });
      }
    });
    let oldMarkers = this.get('markers');
    oldMarkers.forEach((mark) => {
      if (!markers.find((item) => item.id === mark.id)) {
        markers.pushObject(mark);
      }
    });
    this.set('markers', markers);
    return lines;
  }),

  _markers: Ember.computed('markers.[]', function() {
    let markers = Ember.A([]);
    this.get('markers').forEach((mark) => {
      markers.pushObject(this._makeMarker(mark));
    });
    return markers;
  }),

  boundsChanged: Ember.observer('bounds', function() {
    let bounds = this.get('bounds');
    if (bounds) {
      this._zoomMapTo(this._getGoogleBounds(bounds))
    }
  }),

  /*
   * Private options
   */
  classNames: ['gmaps-wrapper'],
  _gMap: Ember.inject.service('gMap'),

  actions: {
    mapLoaded() {
      // Set the cursor for the map
      this.get('_gMap').maps.select('map')
        .map.setOptions({ draggableCursor: this.get('draggableCursor') });

      // Fit the map to the set bounds
      let bounds = this.get('bounds');
      if (bounds) {
        this._zoomMapTo(this._getGoogleBounds(bounds));
      }
    },
    mapClicked(e) {
      let mapClicked = this.get('mapClicked');
      if (mapClicked && typeof mapClicked === 'function') {
        this.get('_gMap')
          .geocode({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            language: 'en'
          })
          .then((geocodes) => {
            mapClicked(geocodes, [e.latLng.lat(), e.latLng.lng()]);
          })
        .catch((err) => {
          console.error(err);
        });
      }
    }
  },
  _zoomMapTo(gBounds) {
    if (!gBounds.isEmpty()) {
      this.get('_gMap').maps.select('map').map.fitBounds(gBounds);
    }
  },
  _getGoogleBounds(bounds) {
    let b = new google.maps.LatLngBounds();
    bounds.forEach((point) => {
      b.extend(new google.maps.LatLng(point[0], point[1]));
    });
    return b;
  },
  _makeLine(opts) {
    let line = {
      id: opts.id,
      path: [ opts.from, opts.to ],
      clickable: true,
      editable: false,
      geodesic: true,
      visible: true,
      strokeColor: mapColors[opts.style],
      zIndex: 1
    };

    let style = lineStyles[opts.style];
    for (let key in style) {
      line[key] = style[key]
    }
    return line;
  },

  _makeMarker(opts) {
    let marker = {
      id: opts.id,
      lat: opts.coords[0],
      lng: opts.coords[1],
      infoWindow: { content: opts.title },
      zIndex: lineStyles[opts.style].zIndex + 1
    };

    let icon = {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: mapColors[opts.style],
      strokeWeight: 2,
      fillColor: "white",
      fillOpacity: 1
    };

    let style = markerStyles[opts.style];
    for (let key in style) {
      icon[key] = style[key]
    }
    marker.icon = icon;
    return marker;
  }

});
