import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    cityChanged(obj) {
      if (obj.address_components) {
        console.log('city changed: ', obj);
      }
    },
    next() {
      this.attrs.next();
    }
  }
});
