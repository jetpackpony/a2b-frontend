import Ember from 'ember';

export default Ember.Component.extend({
  _processResponse(obj) {
    return `${obj.address_components.find((item) => item.types.includes("locality")).long_name}, ${obj.address_components.find((item) => item.types.includes("country")).long_name}`;
  },
  resCity: "",
  resAddress: "",
  resCoords: "",
  actions: {
    cityChanged(obj) {
      if (obj.address_components) {
        this.set('resCity', this._processResponse(obj));
        console.log(this.get('resCity'));
      }
    }
  }
});
