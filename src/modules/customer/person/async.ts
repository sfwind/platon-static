import { pget, ppost } from '../../../utils/request'
import requestProxy from '../../base/requestProxy'

export function loadCertificates() {
  return pget('/rise/customer/get/certificate')
}

export function loadAllElites() {
  return requestProxy.getProxy('/rise/school/friend/load/all')
}

