import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(...arguments);
    json.data.attributes['from-locations'] = snapshot.record['from-locations'];
    json.data.attributes['to-locations'] = snapshot.record['to-locations'];
    return json;
  }
});
