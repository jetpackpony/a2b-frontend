import Ember from 'ember';

export default Ember.Component.extend({
  scrollContainer: '.left-side',
  children: Ember.A([]),
  showResults: false,
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  reset() {
    this.get('children').forEach((view) => {
      return view.ref.reset();
    });
    $(this.get('scrollContainer')).scrollTop(0);
    this.set('showResults', false);
  },
  actions: {
    submit() {
      this.get('submit')(
        () => {
          this.set('showResults', true);
          $(this.get('scrollContainer')).scrollTop(0);
        },
        (error) => {
          this.set('showResults', true);
          $(this.get('scrollContainer')).scrollTop(0);
        }
      );
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    },
    focusStep(step) {
      this.set('currentStep', step);
    }
  }
});
