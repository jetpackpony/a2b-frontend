import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  itinerary: DS.hasMany('itinerary'),

  fromAddress: DS.attr("string"),
  fromCity: DS.attr("string"),
  fromCoords: DS.attr("string"),
  fromComment: DS.attr("string"),

  toAddress: DS.attr("string"),
  toCity: DS.attr("string"),
  toCoords: DS.attr("string"),
  toComment: DS.attr("string"),

  organization: DS.attr("string"),
  companyMail: DS.attr("string"),
  companyPhone: DS.attr("string"),
  companySite: DS.attr("string"),
  companyDescription: DS.attr("string"),

  transportType: DS.attr("string"),
  duration: DS.attr("string"),
  price: DS.attr("string"),
  timetable: DS.attr("string"),
  description: DS.attr("string"),

  title: Ember.computed('transportType', 'toCity', function() {
    return `${this.get('transportType')} to ${this.get('toCity')}`;
  }),
  cities: Ember.computed('fromCity', 'toCity', function() {
    return `${this.get('fromCity')} &rarr; ${this.get('toCity')}`;
  })
});
