import {Signature} from './common/models';
import {constructJsonSignRequest} from './common/util';
import {sendPostJSON} from './utils/http';

class Claim {
  createClaim(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('submitClaim', 'submit_claim', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  evaluateClaim(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('evaluateClaim', 'evaluate_claim', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  listClaimsForProject(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('listClaims', 'list_claim', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }

  listClaimsForProjectByTemplateId(data: any, signature: Signature, PDSUrl: string): Promise<any> {
    const json = constructJsonSignRequest('listClaimsByTemplateId', 'list_claim', signature, data);
    return sendPostJSON(PDSUrl + 'api/request', json);
  }
}

export default Claim;
