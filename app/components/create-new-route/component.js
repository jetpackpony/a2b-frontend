import Ember from 'ember';

export default Ember.Component.extend({
  mapFocusObject: null,
  fromAddressObject: null,
  toAddressObject: null,
  currentStep: 2,
  formPosition: Ember.computed('currentStep', function() {
    switch(this.get('currentStep')) {
      case 2:
        return "from";
      case 3:
        return "to";
      case 4:
        return "details";
      default:
        return null;
    };
  }),
  didInsertElement() {
    this.$('.carousel').carousel({
      interval: false,
      wrap: false,
      keyboard: false
    });
  },
  showBackButton: Ember.computed('currentStep', function() {
    return this.get('currentStep') > 2;
  }),
  actions: {
    createRoute(route) {
      // Bubble the event up
      this.attrs.createRoute(route);
    },
    next() {
      this.$('.carousel').carousel('next');
      this.incrementProperty('currentStep');
      console.log(this.get('newRoute'));
    },
    back() {
      this.$('.carousel').carousel('prev');
      this.decrementProperty('currentStep');
    },
    submit() {
      console.log("complete: ", this.get('newRoute'));
    }
  }
});
