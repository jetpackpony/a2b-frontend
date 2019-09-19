import Ember from 'ember';
import R from 'npm:ramda';
import ControllerWithItinerarySearchMixin from 'a2b/mixins/controller-with-itinerary-search';

export default Ember.Controller.extend(ControllerWithItinerarySearchMixin, {
  session: Ember.inject.service(),
  queryParams: ['fromId', 'toId', 'fromCity', 'toCity'],
  fromId: null,
  toId: null,
  fromCity: null,
  toCity: null,

  sortParams: ['stops', 'duration'],
  sortedItineraries: Ember.computed.sort('model.itineraries', 'sortParams'),
  formFilled: Ember.computed.and('fromId', 'toId')
});
