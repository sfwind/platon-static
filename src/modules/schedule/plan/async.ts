import { pget, ppost } from 'utils/request'
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadSchedulePlan () {
  return pget('/rise/schedule/load/plan')
}

export function loadPersonSchedulePlan () {
  return requestProxy.getProxy('/rise/schedule/load/person/plan')
}

export function createPlan (problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function isLoadDailyTalk () {
  return requestProxy.getProxy('/rise/daily/talk/check')
}
