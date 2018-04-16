import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadPlanSeries(practicePlanId) {
  return requestProxy.getProxy(`/rise/plan/load/series/${practicePlanId}`)
}

export function loadPracticePlan(practicePlanId) {
  return requestProxy.getProxy(`/rise/practice/load/${practicePlanId}`)
}
