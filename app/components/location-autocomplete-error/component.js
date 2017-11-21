import Ember from 'ember';

export default Ember.Component.extend({
  onInputValueChange: Ember.observer('value', function() {
    this.set('error', null);
  }),
  onErrorChange: Ember.observer('error', function() {
    (this.get('error'))
      ? this.showErrorPopover(this.get('error'))
      : this.hideErrorPopover();
  }),
  willDestroyElement() {
    this.set('error', null);
  },
  showErrorPopover(text) {
    this.$().popover(constructPopover(text));
    this.$().popover('show');
  },
  hideErrorPopover() {
    this.$().popover('dispose');
  }
});

const constructPopover = (text) => ({
  content: text,
  trigger: 'focus,click',
  placement: 'bottom',
  template: `<div class="popover error-popover" role="tooltip">
  <div class="popover-arrow"></div>
  <h3 class="popover-title"></h3>
  <div class="popover-content"></div>
  </div>`
});
