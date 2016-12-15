import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['autocomplete-field'],
  value: '',
  hasSuggestions: Ember.computed.gt('suggestions.length', 0),
  suggestions: Ember.A([]),
  _runFilter() {
    this.get('filter')(this.get('value'))
      .then((res) => this.set('suggestions', res));
  },
  actions: {
    handleInput() {
      if (this.get('value').length > 2)  {
        Ember.run.debounce(this, this._runFilter, 300);
      } else {
        this.set('suggestions', Ember.A([]));
      }
    },
    selectSuggestion(sugg) {
      this.set('value', sugg.get('name'));
      this.set('suggestions', Ember.A([]));
      this.get('select')(sugg);
    }
  }
});
