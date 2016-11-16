import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'bottom-split', 'add-route-form'],
  mapFocusObject: null,
  fromAddressObject: null,
  toAddressObject: null,
  currentStep: 1,
  complete: false,
  errorMessage: null,
  formPosition: Ember.computed('currentStep', function() {
    switch(this.get('currentStep')) {
      case 1:
        return "from";
      case 2:
        return "to";
      case 3:
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
    return this.get('currentStep') > 1;
  }),
  actions: {
    createRoute(route) {
      // Bubble the event up
      this.attrs.createRoute(route);
    },
    next() {
      this.incrementProperty('currentStep');
      this.$('.carousel').carousel('next');
    },
    back() {
      this.decrementProperty('currentStep');
      this.$('.carousel').carousel('prev');
    },
    submit() {
      console.log("sumitting route: ", this.get('newRoute'));
      this.get('newRoute').save()
        .then(() => {
          this.send('next');
          this.set('complete', true);
        })
        .catch((error) => {
          console.log('error:', error);
          this.set('errorMessage', error.message);
          this.send('next');
          this.set('complete', true);
        });
    }
  }
});
