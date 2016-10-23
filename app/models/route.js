import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  itinerary: DS.hasMany('itinerary'),

  fromAddress: DS.attr("string"),
  fromCity: DS.attr("string"),
  fromCoords: DS.attr("string"),

  toAddress: DS.attr("string"),
  toCity: DS.attr("string"),
  toCoords: DS.attr("string"),

  transportType: DS.attr("string"),
  organization: DS.attr("string"),
  description: DS.attr("string"),

  duration: DS.attr("string"),
  price: DS.attr("string"),
  timetable: DS.attr("string"),

  title: Ember.computed('transportType', 'toCity', function() {
    return `${this.get('transportType')} to ${this.get('toCity')}`;
  })
});
