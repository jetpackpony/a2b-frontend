import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "form",
  transportTypes: Ember.A(["Bus", "Ferry", "Train"]),
  newRoute: null,
  showSubmitButton: Ember.computed('newRoute.{transportType,organization,duration,price,timetable}', function() {
    let route = this.get('newRoute');
    if (route.get('transportType') && route.get('organization')
        && route.get('duration') && route.get('price')
        && route.get('timetable')) {
      return true;
    }
    return false;
  }),
  actions: {
    submit() {
      this.attrs.submit();
    },
    transportTypeChanged() {
      this.set('newRoute.transportType', event.target.value);
    },
    durationChanged() {
      let duration = parseInt(this.$('#duration-hours').val())
        + parseInt(this.$('#duration-minutes').val() || "0") / 60;
      this.set('newRoute.duration', duration.toString());
    }
  }

});
