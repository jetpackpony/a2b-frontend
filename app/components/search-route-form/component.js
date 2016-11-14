import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-wrapper'],
  from: null,
  to: null,
  from_input: Ember.computed.oneWay('from'),
  to_input: Ember.computed.oneWay('to'),
  from_val: Ember.computed.oneWay('from'),
  to_val: Ember.computed.oneWay('to'),
  didRender() {
    this._super(...arguments);

    // Disable the submit on enter to avoid submit after location selectioon
    this.$('#search-form').on('keyup keypress', function(e) {
      let keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });
  },
  _processResponse(obj) {
    if (obj.address_components) {
      return `${obj.address_components.find((item) => item.types.includes("locality")).long_name}, ${obj.address_components.find((item) => item.types.includes("country")).long_name}`;
    } else {
      return obj.name;
    }
  },
  actions: {
    search() {
      this.attrs.submitSearch(this.get('from_val'), this.get('to_val'));
    },
    fromChanged(obj) {
      this.set('from_val', this._processResponse(obj));
    },
    toChanged(obj) {
      this.set('to_val', this._processResponse(obj));
    }
  }
});
