import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['autocomplete-field'],
  value: '',
  valueLongEnough: Ember.computed.gt('value.length', 2),
  suggestions: Ember.A([]),
  actions: {
    handleInput(value) {
      if (value.length > 2)  {
        this.get('filter')(value).then((res) => this.set('suggestions', res));
      }
    }
  }
});
