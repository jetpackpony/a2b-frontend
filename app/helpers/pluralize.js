import Ember from 'ember';

export function pluralize([count, string]) {
  return (count > 1) ? `${string}s` : string;
}

export default Ember.Helper.helper(pluralize);
