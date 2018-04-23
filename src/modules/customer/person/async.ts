
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadCertificates() {
  return requestProxy.getProxy('/rise/customer/get/certificate')
}

export function loadAllElites(page) {
  if(!page) page = 1
  return requestProxy.getProxy('/rise/personal/school/friend',{ page })
}

