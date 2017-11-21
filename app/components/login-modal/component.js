import Ember from 'ember';

export default Ember.Component.extend({
  onSuccess: () => {},
  didInsertElement() {
    this._super(...arguments);
    if (this.get('showModal')) {
      this.show();
    }
    // Fire onSuccess when modal is closed
    this.$('.contacts-modal')
      .on('hidden.bs.modal', () => this.get('onSuccess')());
  },
  onShowModalChange: Ember.observer('showModal', function() {
    (this.get('showModal'))
      ? this.show()
      : this.hide();
  }),
  actions: {
    authComplete() {
      this.hide();
    }
  },
  show() {
    this.$('.contacts-modal').modal('show');
  },
  hide() {
    this.$('.contacts-modal').modal('hide');
  }
});
