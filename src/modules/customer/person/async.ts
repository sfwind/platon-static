import { pget, ppost } from "../../../utils/request"

export function loadCertificates(){
  return pget('/rise/customer/get/certificate')
}

