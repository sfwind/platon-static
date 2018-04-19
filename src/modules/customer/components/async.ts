
import requestProxy from '../../../components/requestproxy/requestProxy'

export function getMobileCode(param){
  return requestProxy.postProxy("/rise/customer/send/valid/code",param)
}
