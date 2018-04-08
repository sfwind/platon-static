import requestProxy from '../base/requestProxy'
import { pget } from '../../utils/request'


export function loadDailyTalk(){
  return requestProxy.getProxy('/rise/daily/talk')
  //return pget('/rise/daily/talk')
}
