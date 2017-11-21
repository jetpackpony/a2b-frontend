import Ember from 'ember';

export default Ember.Mixin.create({
  pageviewToYandex: Ember.on('didTransition', function(page) {
    (window.yaCounter41830664)
      ? window.yaCounter41830664.hit((page) ? page : this.get('url'))
      : null;
  })
});
