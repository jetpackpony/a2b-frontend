import Ember from 'ember';
import ControllerWithItinerarySearchMixin from 'a2b/mixins/controller-with-itinerary-search';

export default Ember.Controller.extend(ControllerWithItinerarySearchMixin, {
  session: Ember.inject.service(),
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
  }),
  showModal: Ember.computed('session.searchNumber', function() {
    if (this.get('session.isAuthenticated')) {
      return false;
    }
    if (!this._modalHasBeenShown() && this.get('session.searchNumber') >= 2) {
      let storage = window.localStorage;
      if (storage) {
        storage.setItem('modalHasBeenShown', true);
      }
      return true;
    } else {
      return false;
    }
  }),
  _modalHasBeenShown() {
    let storage = window.localStorage;
    return storage && storage.modalHasBeenShown;
  }
});
