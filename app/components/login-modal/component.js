import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.$('.contacts-modal').modal('show');
  },
  actions: {
    authComplete() {
      this.$('.contacts-modal').modal('hide');
    }
  }
});
