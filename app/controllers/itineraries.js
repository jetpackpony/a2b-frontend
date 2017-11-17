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
  formFilled: Ember.computed.and('fromId', 'toId'),
  showModal: Ember.computed('session.searchNumber', function() {
    return !(
      this.get('session.isAuthenticated')
      || this.modalHasBeenShown()
      || this.get('session.searchNumber') < 2
    );
  }),
  onShowModalChange: Ember.observer('showModal', function() {
    if (this.get('showModal') && window.localStorage) {
      window.localStorage.setItem('modalHasBeenShown', true);
    }
  }),

  modalHasBeenShown() {
    return R.path(['localStorage', 'modalHasBeenShown'], window);
  }
});
