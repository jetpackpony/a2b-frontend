import Ember from 'ember';

export function durationString([duration, ...params]) {
  if (duration % 1 === 0) {
    return `${duration - (duration % 1)} hours`;
  } else {
    return `${duration - (duration % 1)}h ${(duration % 1) * 60}m`
  }
}

export default Ember.Helper.helper(durationString);
