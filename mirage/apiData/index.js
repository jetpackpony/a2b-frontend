import R from 'npm:ramda';
import bkkToKul from './bkk-kul-api-data';
import bkkToPnh from './bkk-pnh-api-data';
import emptyResponse from './empty-response';

export default (from, to) => (
  (from === 'Bangkok, Thailand'
    && to === 'Phnom Penh, Cambodia')
  ? bkkToPnh()
  : ((from === 'Bangkok, Thailand'
    && to === 'Kuala Lumpur, Malaysia')
    ? bkkToKul()
    : emptyResponse()
  )
);
