import { pget, ppost } from "utils/request";

export function loadPlan() {
  return pget(`/rise/plan/load`)
}

export function loadPlanHistory(series) {
  return pget(`/rise/plan/history/load/${series}`)
}

export function loadPlanIntro(planId) {
  return pget(`/rise/plan/play/${planId}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function completePlan() {
  return ppost(`/rise/plan/complete`)
}

export function closePlan() {
  return ppost(`/rise/plan/close`)
}

export function updateOpenRise(){
  return ppost(`/rise/plan/openrise`)
}

export function checkPractice(series){
  return ppost(`/rise/plan/check/${series}`)
}

export function gradeProblem(problemScores,problemId){
  return ppost(`/rise/problem/grade/${problemId}`,problemScores);
}

export function markRiseMemberTips(){
  return pget('/rise/plan/risemember/tips');
}

export function isRiseMember(){
  return pget('/rise/plan/risemember');
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/rise/practice/knowledge/learn/${knowledgeId}`)
}

export function mark(param){
  return ppost('/rise/b/mark',param);
}
