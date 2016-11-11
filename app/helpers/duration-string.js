import Ember from 'ember';

export function durationString([duration, ...params]) {
  let mins = duration % 1;
  let hours = duration - mins;
  if (mins === 0) {
    return `${hours} hour${hours > 1 ? "s" : ''}`;
  } else {
    return `${duration - (duration % 1)}h ${(duration % 1) * 60}m`
  }
}

export default Ember.Helper.helper(durationString);
