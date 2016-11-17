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
    zIndex: 3
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
   * "cell|pointer|hand|...."
   */
  draggableCursor: 'hand',

  /*
   * Observers and computed
   */
  linesChanged: Ember.observer('lines.[]', function() {
    this.set('_polylines', Ember.A([]));
    this.get('lines').forEach((line) => {
      this.get('_polylines').pushObject(this._makeLine({
        id: line.id,
        from: line.from,
        to: line.to,
        style: line.style
      }));

      if (line.markers && line.markers.titles) {
        this.get('markers').pushObject({
          id: `${line.id}-from`,
          coords: line.from,
          style: line.style,
          title: line.markers.titles.from
        });
        this.get('markers').pushObject({
          id: `${line.id}-to`,
          coords: line.to,
          style: line.style,
          title: line.markers.titles.to
        });
      }
    });
  }),
  markersChanged: Ember.observer('markers.[]', function() {
    this.set('_markers', Ember.A([]));
    this.get('markers').forEach((mark) => {
      this.get('_markers').pushObject(this._makeMarker(mark));
    });
  }),


  /*
   * Private options
   */
  _gMap: Ember.inject.service(),
  _lat: 15,
  _lng: 100,
  _zoom: 4,
  _markers: Ember.A([]),
  _polylines: Ember.A([]),

  actions: {
    mapLoaded() {
      // Set the cursor for the map
      this.get('gMap').maps.select('my-map')
        .map.setOptions({ draggableCursor: this.get('draggableCursor') });

      // Fit the map to the set bounds
      let bounds = this.get('bounds');
      if (bounds) {
        this._zoomToBounds(bounds);
      }
    },
    mapClicked(e) {
      this.get('mapClicked')([e.latLng.lat(), e.latLng.lng()]);
    }
  },
  _zoomToBounds(bounds) {
    let gBounds = this._getGoogleBounds(bounds);
    if (!gBounds.isEmpty()) {
      this.get('_gMap').maps.select('my-map').map.fitBounds(gBounds);
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
