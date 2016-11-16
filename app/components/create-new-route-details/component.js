import Ember from 'ember';

export default Ember.Component.extend({
  transportTypes: Ember.A(["Bus", "Ferry", "Train"]),
  newRoute: null,
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
      this.set('newRoute.transportType', event.target.value);
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
