import { pget, ppost } from 'utils/request'

export function loadSchedulePlan(){
  return pget('/rise/schedule//load/plan')
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}
