import requestProxy from '../../components/requestproxy/requestProxy'

export function loadDailyTalk () {
  return requestProxy.getProxy('/rise/daily/talk')
}
