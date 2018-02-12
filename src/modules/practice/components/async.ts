import { pget, ppost } from "utils/request";

export function loadPlanSeries(practicePlanId) {
  return pget(`/rise/plan/load/series/${practicePlanId}`)
}

export function loadPracticePlan(practicePlanId) {
  return pget(`/rise/practice/load/${practicePlanId}`)
}
