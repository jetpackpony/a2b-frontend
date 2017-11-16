import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  address: null,
  addressText: Ember.computed('address', {
    get(key) {
      return R.propOr('', 'formatted_address', this.get('address'));
    },
    set(key, value) {
      return value;
    }
  }),
  actions: {
    toggleAddress() {
      this.get('toggleAddress')();
    },
    addressChanged(obj) {
      this.set('address', obj);
    }
  }
});
