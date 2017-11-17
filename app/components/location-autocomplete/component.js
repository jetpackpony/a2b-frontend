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
  showSuggestions: Ember.computed('suggestions.[]', 'isFocused', function(assert) {
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
      if ($(e.relatedTarget).parents('div.suggestions').length === 0) {
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
  keyUp(e) {
    if (this.get('showSuggestions')) {
      switch(e.keyCode) {
        case 38:
          this.scrollSuggestions('up');
        break;
        case 40:
          this.scrollSuggestions('down');
        break;
      }
    }
  },
  scrollSuggestions(direction) {
    this.$(
      getNextSuggestionSelector(
        this.$('a:focus'),
        this.get('suggestions.length'),
        direction
      )
    ).focus();
  },
});

const getNextSuggestionSelector = (
  currentFocusedElement, suggestionsNumber, direction
) => (
  (currentFocusedElement.length === 0)
    ? '.suggestions a:first'
    : `.suggestions a[data-index="${
        getNextSuggestionIndex(
          suggestionsNumber,
          parseInt(currentFocusedElement.attr('data-index')),
          direction
        )
      }"]`
);

const getNextSuggestionIndex = (
  suggestionsNumber, currentIndex, direction
) => (
  cycleValue(
    0,
    suggestionsNumber - 1,
    ((direction === 'up')
      ? currentIndex - 1
      : currentIndex + 1)
  )
);

const cycleValue = (min, max, value) => (
  (value > max)
    ? min
    : ((value < min)
      ? max
      : value)
);
