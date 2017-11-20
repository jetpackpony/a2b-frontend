import Ember from 'ember';

export default Ember.Helper.helper(([count, string]) => (
  (count > 1) ? `${string}s` : string
));
