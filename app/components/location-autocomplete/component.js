import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['autocomplete-field'],
  value: '',
  suggestions: Ember.A([]),
  actions: {
    handleInput(value) {
      this.get('filter')(value).then((res) => this.set('suggestions', res));
    }
  }
});
