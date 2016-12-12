import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: ENV.a2b.apiEndPoint,
  handleResponse: function(status, headers, payload, req){
    if(payload.errors){
      let msg = `Server error occured while processing: '${req.method} ${req.url}'`;
      return new DS.AdapterError(payload.errors, msg);
    }
    return this._super(...arguments);
  }
});
