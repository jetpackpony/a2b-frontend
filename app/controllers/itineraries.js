import Ember from 'ember';
import ControllerWithItinerarySearchMixin from 'a2b/mixins/controller-with-itinerary-search';

export default Ember.Controller.extend(ControllerWithItinerarySearchMixin, {
  queryParams: ['fromId', 'toId', 'fromCity', 'toCity'],
  fromId: null,
  toId: null,
  fromCity: null,
  toCity: null,

  sortParams: ['stops', 'duration'],
  sortedItineraries: Ember.computed.sort('model', 'sortParams'),

  formFilled: Ember.computed('fromId', 'toId', function() {
    return this.get('fromId') !== null && this.get('toId') !== null &&
      this.get('fromId') !== "" && this.get('toId') !== "";
  })
});
