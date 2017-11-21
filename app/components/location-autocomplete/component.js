import Ember from 'ember';

const maxSuggestions = 5;
const minQueryLength = 1;

export default Ember.Component.extend({
  locations: Ember.inject.service(),
  classNames: ['autocomplete-field'],
  isFocused: false,
  location: null,
  suggestions: Ember.A([]),
  valueSelected: false,
  value: Ember.computed('location.name', {
    get() { return this.get('location.name'); },
    set(key, value) { return value; }
  }),
  isLoading: Ember.computed('suggestions.[]', {
    // When suggestions update, remove the loader spinner
    get() { return false; },
    set(k, v) { return v; }
  }),
  showSuggestions: Ember.computed('suggestions.[]', 'isFocused', function() {
    return this.get('value.length') >= minQueryLength
            && this.get('isFocused')
            && !this.get('valueSelected')
            && !this.get('isLoading');
  }),

  actions: {
    handleInput() {
      if (this.get('value').length >= minQueryLength)  {
        this.set('suggestions', Ember.A([]));
        this.set('valueSelected', false);
        this.set('isLoading', true);
        Ember.run.debounce(this, this.searchLocations, 300);
      }
    },
    selectSuggestion(sugg) {
      this.set('location', sugg);
      this.set('valueSelected', true);
      this.set('suggestions', Ember.A([]));
    },
    focusInput() {
      this.set('isFocused', true);
    },
    blurInput(e) {
      // Unfocus only if the new focus is another element
      if (this.$(e.relatedTarget).parents('div.suggestions').length === 0) {
        this.set('isFocused', false);
      }
    },
    clear() {
      this.set('value', '');
      this.set('location', null);
    }
  },
  searchLocations() {
    this.get('locations')
      .filter(this.get('value'))
      .then((res) => res.slice(0, maxSuggestions))
      .then((suggestions) => this.set('suggestions', suggestions));
  },
});
