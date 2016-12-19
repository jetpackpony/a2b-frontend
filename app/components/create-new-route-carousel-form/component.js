import Ember from 'ember';

export default Ember.Component.extend({
  children: Ember.A([]),
  complete: false,
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
    this.$('.carousel').carousel(0);
    this.set('complete', false);
  },
  actions: {
    submit(resolve, reject) {
      this.get('submit')(
        () => {
          this.send('next');
          this.set('complete', true);
        },
        (error) => {
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
