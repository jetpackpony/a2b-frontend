import Ember from 'ember';

export default Ember.Component.extend({
  children: Ember.A([]),
  actions: {
    submit(resolve, reject) {
      this.get('submit')(
        () => {
        },
        (error) => {
        }
      );
    },
    registerChild(id, child) {
      this.get('children').pushObject({ id, ref: child });
    }
  }
});
