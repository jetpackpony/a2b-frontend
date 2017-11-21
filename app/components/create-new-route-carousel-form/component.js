import Ember from 'ember';

export default Ember.Component.extend({
  children: Ember.A([]),
  complete: false,
  countriesList: Ember.computed('countries', function() {
    return this.get('countries').mapBy('text').join(', ');
  }),
  didInsertElement() {
    this.$('.carousel').carousel({
      interval: false,
      wrap: false,
      keyboard: false
    });
    this.rewindToCurrentStep();
  },
  onChangeStep: Ember.observer('currentStep', function() {
    // If we go back to the first step, reset the form
    if (this.get('currentStep') === 1) {
      this.set('complete', false);
    }
    this.rewindToCurrentStep();
  }),
  rewindToCurrentStep() {
    this.$('.carousel').carousel(this.get('currentStep') - 1);
  },

  actions: {
    submit() {
      // Pass the callbacks to submit - they will be called when
      // request is finished
      this.get('submit')(
        () => {
          this.send('next');
          this.set('complete', true);
        },
        (error) => {
          console.log(error);
          this.send('next');
          this.set('complete', true);
        }
      );
    },
    next() {
      this.incrementProperty('currentStep');
    },
    back() {
      this.decrementProperty('currentStep');
    }
  }
});
