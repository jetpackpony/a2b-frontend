import Ember from 'ember';

const transportTypes = ["Bus", "Ferry", "Train"];

export default Ember.Component.extend({
  transportType: null,
  transportTypeFieldValues: Ember.A(transportTypes),

  transportTypeEmpty: Ember.computed(
    'transportType',
    'showOtherTransportField',
    function() {
      return !this.get('transportType')
        && !this.get('showOtherTransportField');
    }
  ),
  showOtherTransportField: Ember.computed('transportType', {
    get() {
      return !!this.get('transportType') &&
        transportTypes.indexOf(this.get('transportType')) === -1;
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {
    transportTypeChanged() {
      (event.target.value === 'Other')
        ? (
          this.set('transportType', ""),
          this.set('showOtherTransportField', true)
        )
        : this.set('transportType', event.target.value);
    }
  }
});
