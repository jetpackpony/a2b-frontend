import Ember from 'ember';

export default Ember.Component.extend({
  duration: null,
  durationHours: Ember.computed('duration', {
    get() {
      return getHours(this.get('duration'));
    },
    set(key, value) {
      this.set('duration', addHours(this.get('duration'), value));
      return value;
    }
  }),
  durationMinutes: Ember.computed('duration', {
    get() {
      return getMinutes(this.get('duration'));
    },
    set(key, value) {
      this.set('duration', addMinutes(this.get('duration'), value));
      return value;
    }
  })
});

const getHours = (time) => (
  (time)
  ? Math.floor(time)
  : null
);

const getMinutes = (time) => (
  (time)
  ? Math.round((time % 1) * 60)
  : null
);

const addHours = (time, hours) => (
  ((time || 0) % 1) + parseInt(hours)
);

const addMinutes = (time, minutes) => (
  Math.floor(time || 0) + parseInt(minutes || 0) / 60
);
