import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  city: null,
  cityText: Ember.computed('city', {
    get(key) {
      return R.propOr('', 'formatted_address', this.get('city'));
    },
    set(key, value) {
      return value;
    }
  }),
  actions: {
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('city', obj);
      }
    }
  }
});
