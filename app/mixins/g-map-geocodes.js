import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Mixin.create({
  gMap: Ember.inject.service(),

  getAddressByPoint(point) {
    return this.get('gMap').geocode({
      lat: point[0],
      lng: point[1],
      language: 'en'
    }).then(
      (geocodes) => getAddressFromGeocodes(geocodes, point),
      (err) => console.error(err)
    );
  },

  getCountryByName(name) {
    return this.get('gMap').geocode({
      address: name
    }).then(
      (geocodes) => geocodes[0],
      (err) => console.error(err)
    );
  }
});

const getAddressFromGeocodes = (geocodes, point) => (
  R.merge(
    (getGeocodeItem(geocodes, 'route')
      || getGeocodeItem(geocodes, 'street_address')),
    // Replace the coordinates by the ones user clicked on
    {
      geometry: {
        location: {
          lat: () => point[0],
          lng: () => point[1]
        }
      }
    }
  )
);

const getGeocodeItem = (geocodes, itemName) => (
  geocodes.find((item) => item.types.includes(itemName))
);

