import Ember from 'ember';

export default Ember.Component.extend({
  onSuccess: () => {},
  didInsertElement() {
    this._super(...arguments);
    if (this.get('showModal')) {
      this.$('.contacts-modal').modal('show');
    }
    // Fire onSuccess when modal is closed
    this.$('.contacts-modal')
      .on('hidden.bs.modal', (e) => this.get('onSuccess')());
  },
  onShowModalChange: Ember.observer('showModal', function() {
    if (this.get('showModal')) {
      this.$('.contacts-modal').modal('show');
    } else {
      this.$('.contacts-modal').modal('hide');
    }
  }),
  actions: {
    authComplete() {
      this.$('.contacts-modal').modal('hide');
    }
  }
});
