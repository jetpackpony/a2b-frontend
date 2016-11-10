import Ember from 'ember';

export default Ember.Component.extend({
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
    }
  }
});
