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
  },
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  reset() {
    this.get('children').forEach((view) => {
      return view.ref.reset();
    });
  },

  onChangeStep: Ember.observer('currentStep', function() {
    // If we go back to the first step, reset the form
    if (this.get('currentStep') == 1) {
      this.$('.carousel').carousel(0);
      this.set('complete', false);
    }
  }),

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
      this.$('.carousel').carousel('next');
    },
    back() {
      this.decrementProperty('currentStep');
      this.$('.carousel').carousel('prev');
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    }
  }
});
