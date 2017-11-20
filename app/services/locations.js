import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  filter(name) {
    return (name)
      ? this.get('store').query('location', {
        filter: { name }
      })
      : RSVP.resolve([]);
  }
});
