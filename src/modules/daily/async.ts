import requestProxy from '../base/requestProxy'
import { pget } from '../../utils/request'


export function loadDailyTalk(){
  return pget('/rise/daily/talk')
}
