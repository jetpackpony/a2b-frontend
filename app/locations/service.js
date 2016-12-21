import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  filter(value) {
    if (value && value.length > 2) {
      return this.get('store').query('location', { filter: { name: value } });
    } else {
      return RSVP.resolve([]);
    }
  }
});
