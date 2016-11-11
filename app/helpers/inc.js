import Ember from 'ember';

export function inc([value, ...params]) {
  return value + 1;
}

export default Ember.Helper.helper(inc);
