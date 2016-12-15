import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['autocomplete-field'],
  value: '',
  hasSuggestions: Ember.computed.gt('suggestions.length', 0),
  suggestions: Ember.A([]),
  actions: {
    handleInput(value) {
      if (value.length > 2)  {
        this.get('filter')(value).then((res) => this.set('suggestions', res));
      } else {
        this.set('suggestions', Ember.A([]));
      }
    }
  }
});
