import Ember from 'ember';

export default Ember.Component.extend({
  children: Ember.A([]),
  init() {
    this._super(...arguments);
    this.get('registerChild')(this);
  },
  actions: {
    submit(resolve, reject) {
      this.get('submit')(
        () => {
        },
        (error) => {
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
