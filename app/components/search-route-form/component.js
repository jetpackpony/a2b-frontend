import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  fromError: null,
  toError: null,
  classNames: ['form-wrapper'],
  actions: {
    search() {
      let params = {
        fromLocation: this.get('from'),
        toLocation: this.get('to')
      };
      (paramsAreValid(params))
        ? this.get('submitSearch')(params)
        : this.showErrors(composeErrors(params));
    }
  },
  showErrors(errors) {
    errors.map((err) => (
      this.set(
        `${err.field}Error`,
        ((err.error === 'empty')
          ? emptyMessage
          : sameLocationMessage))
    ));
  }
});

const paramsAreValid = (params) => (
  composeErrors(params).length === 0
);

const composeErrors = (params) => (
  R.reject(R.isNil, [
    ((!params.fromLocation
      || !params.fromLocation.get('id')
      || !params.fromLocation.get('name'))
      ? { field: 'from', error: 'empty' }
      : null),
    ((!params.toLocation
      || !params.toLocation.get('id')
      || !params.toLocation.get('name'))
      ? { field: 'to', error: 'empty' }
      : null),
    ((params.fromLocation && params.toLocation
      && params.fromLocation.get('id') === params.toLocation.get('id'))
      ? { field: 'to', error: 'same-location' }
      : null)
  ])
);

const emptyMessage = 'Search a location and select one of the values from the suggestions';
const sameLocationMessage = 'Please choose a different location from the origin';
