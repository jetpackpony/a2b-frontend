import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['route-item'],
  isHovered: Ember.computed('routeHovered', 'rotue', function() {
    return this.get('routeHovered.id') === this.get('route.id');
  })
});
