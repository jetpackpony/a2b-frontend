import Ember from 'ember';

Ember.LinkComponent.reopen({
  disabled: Ember.computed(function(key, value) {
    if (value !== undefined) {
      this.set('_isDisabled', value === true);
    }
    return value === true ? get(this, 'disabledClass') : false;
  })
});

export default Ember.Component.extend({
  session: Ember.inject.service(),
  tagName: "nav",
  classNames: ["navbar","navbar-full"],
  notAuthed: Ember.computed('session.isAuthenticated', function() {
    return !this.get('session.isAuthenticated');
  }),
  didRender() {
    this.$('a').tooltip('dispose');
    this.$('a.disabled').tooltip({
      title: 'Please log in or sign up to use this section of the website',
      placement: 'bottom',
      trigger: 'hover'
    });
  }
});
