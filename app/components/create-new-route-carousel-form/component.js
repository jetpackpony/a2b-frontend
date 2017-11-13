import Ember from 'ember';

export default Ember.Component.extend({
  children: Ember.A([]),
  complete: false,
  countries: Ember.A([
    { text: "Vietnam", value: "vn" },
    { text: "Cambodia", value: "kh" },
    { text: "Laos", value: "la" },
    { text: "Myanmar", value: "mm" },
    { text: "Thailand", value: "th" },
    { text: "Malaysia", value: "my" },
    { text: "Brunei", value: "bn" },
    { text: "East Timor", value: "tl" },
    { text: "Indonesia", value: "id" },
    { text: "Singapore", value: "sg" },
    { text: "Philippines", value: "ph" }
  ]),
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
    this.$('.carousel').carousel(0);
    this.set('complete', false);
  },
  actions: {
    submit() {
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
