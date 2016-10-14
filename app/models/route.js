import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  price: DS.attr(),
  from_city: DS.attr(),
  to_city: DS.attr()
});
