import Ember from 'ember';

export default Ember.Component.extend({
  suggestions: Ember.A([]),
  isLoading: false,
  show: false,

  didInsertElement() {
    this._super(...arguments);
    this.$()
      .parent('.autocomplete-field')
      .keyup(this.keyUpCallback.bind(this))
  },

  actions: {
    selectSuggestion(sugg) {
      this.get('selectSuggestion')(sugg);
    }
  },
  keyUpCallback(e) {
    if (this.get('show')) {
      // Up and down arrow keys
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
    ? 'a:first'
    : `a[data-index="${
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
