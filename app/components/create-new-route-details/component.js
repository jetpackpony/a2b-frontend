import Ember from 'ember';

export default Ember.Component.extend({
  transportTypes: Ember.A(["Bus", "Ferry", "Train", "Other"]),
  newRoute: null,
  showOtherTransportField: false,
  showSubmitButton: Ember.computed('newRoute.{transportType,organization,duration,price,description}', function() {
    let route = this.get('newRoute');
    if (route.get('transportType') && route.get('organization')
        && route.get('duration') && route.get('price')
        && route.get('description')) {
      return true;
    }
    return false;
  }),
  actions: {
    submit() {
      this.get('submit')();
    },
    transportTypeChanged() {
      let val = event.target.value;
      if (val === 'Other') {
        this.set('showOtherTransportField', true);
      } else {
        this.set('showOtherTransportField', false);
        this.set('newRoute.transportType', val);
      }
    },
    durationChanged() {
      let duration = parseInt(this.$('#duration-hours').val())
        + parseInt(this.$('#duration-minutes').val() || "0") / 60;
      this.set('newRoute.duration', duration.toString());
    },
    back() {
      this.get('back')();
    }
  }

});
