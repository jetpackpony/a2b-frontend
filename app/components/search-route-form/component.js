import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-wrapper'],
  query: { fromCity: null, toCity: null, fromCoords: null, toCoords: null },
  actions: {
    search() {
      this.get('submitSearch')(this.get('query'));
    },
    fromChanged(obj) {
      let loc = obj.geometry.location;
      this.set('query.fromCity', obj.formatted_address);
      this.set('query.fromCoords', `${loc.lat()}, ${loc.lng()}`);
    },
    toChanged(obj) {
      let loc = obj.geometry.location;
      this.set('query.toCity', obj.formatted_address);
      this.set('query.toCoords', `${loc.lat()}, ${loc.lng()}`);
    }
  }
});
