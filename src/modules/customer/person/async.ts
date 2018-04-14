
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadCertificates() {
  return requestProxy.getProxy('/rise/customer/get/certificate')
}

export function loadAllElites() {
  return requestProxy.getProxy('/rise/school/friend/load/all')
}

