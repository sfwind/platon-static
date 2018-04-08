import { pget, ppost } from 'utils/request'
import requestProxy from '../../base/requestProxy'

export function loadSchedulePlan () {
  return pget('/rise/schedule/load/plan')
}

export function loadPersonSchedulePlan () {
  return requestProxy.getProxy('/rise/schedule/load/person/plan')
}

export function createPlan (problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function loadGoCountDownPageStatus () {
  return pget('/rise/customer/get/countdown/status')
}

export function isLoadDailyTalk(){
  return requestProxy.getProxy('/rise/daily/talk/check')
}
