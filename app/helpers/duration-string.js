import Ember from 'ember';
import helper from './pluralize';
const pluralize = helper.compute;

export default Ember.Helper.helper(([duration, ...params]) => {
  let mins = (duration % 1) * 60;
  let hours = Math.floor(duration);
  return (hours === 0)
    ? `${mins} minutes`
    : ((mins === 0)
      ? `${hours} ${pluralize([hours, 'hour'])}`
      : `${hours}h ${mins}m`);
});
