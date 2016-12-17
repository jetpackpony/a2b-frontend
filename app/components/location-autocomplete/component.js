import Ember from 'ember';

export default Ember.Component.extend({
  locations: Ember.inject.service(),
  classNames: ['autocomplete-field'],
  value: '',
  isFocused: false,
  showSuggestions: Ember.computed('suggestions.length', 'isFocused', function(assert) {
    return this.get('suggestions.length') > 0 && this.get('isFocused');
  }),
  suggestions: Ember.A([]),
  _runFilter() {
    this.get('locations').filter(this.get('value'))
      .then((res) => this.set('suggestions', res));
  },
  _scrollSuggestions(direction) {
    let focused = this.$('a:focus');
    if (focused.length === 0) {
      this.$('.suggestions a:first').focus();
    } else {
      let length = this.get('suggestions.length');
      let nextIndex = parseInt(focused.attr('data-index'));
      nextIndex = direction === 'up' ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex >= length) {
        nextIndex = 0;
      }
      if (nextIndex < 0) {
        nextIndex = length - 1;
      }
      this.$(`.suggestions a[data-index="${nextIndex}"]`).focus();
    }
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
    },
    focusInput() {
      this.set('isFocused', true);
    },
    blurInput(e) {
      // Unfocus only if the new focus is another element
      if ($(e.relatedTarget).parents('div.suggestions').length === 0) {
        this.set('isFocused', false);
      }
    },
    clear() {
      this.set('value', '');
    }
  },
  keyUp(e) {
    if (this.get('showSuggestions')) {
      switch(e.keyCode) {
        case 38:
          this._scrollSuggestions('up');
        break;
        case 40:
          this._scrollSuggestions('down');
        break;
      }
    }
  }
});
