import requestProxy from '../base/requestProxy'



export function loadDailyTalk(){
  return requestProxy.getProxy('/rise/daily/talk')
}
