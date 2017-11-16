import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  location: null,
  showAddress: true,

  isCountrySet: Ember.computed('location.country', function() {
    return !!R.prop('formatted_address', this.get('location.country'));
  }),
  isCitySet: Ember.computed('location.city', function() {
    return !!R.prop('formatted_address', this.get('location.city'));
  }),
  isAddressSet: Ember.computed('location.{address,comment}', function() {
    return (this.get('location.comment')
      || !!R.prop('formatted_address', this.get('location.address')));
  }),

  countryRestriction: Ember.computed('location.country', function() {
    return {
      country: this.get('location.country').address_components[0].short_name
    };
  }),

  onCityChanged: Ember.observer('location.city', function() {
    this.set('location.address', null);
    this.set('location.comment', null);
    this.set('showAddress', true);
  }),

  actions: {
    toggleAddress() {
      this.toggleProperty('showAddress');
    },
    next() {
      this.get('next')();
    },
    back() {
      this.get('back')();
    }
  }
});
