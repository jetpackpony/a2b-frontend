import Ember from 'ember';

export default Ember.Mixin.create({
  pageviewToYandex: Ember.on('didTransition', function(page, title) {
    let url = page ? page : this.get('url');
    if (window.yaCounter41830664 !== undefined) {
      window.yaCounter41830664.hit(url);
    }
  })
});
