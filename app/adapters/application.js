import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: ENV.a2b.apiEndPoint,
  handleResponse: function(status, headers, payload, req) {
    return (payload.errors)
      ? new DS.AdapterError(payload.errors, getErrorMsg(req))
      : this._super(...arguments);
  }
});

const getErrorMsg = (req) => (
 `Server error occured while processing: '${req.method} ${req.url}'`
);
