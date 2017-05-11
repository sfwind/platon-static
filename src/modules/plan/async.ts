import { pget, ppost } from "utils/request";

export function loadPlan(planId) {
  let param = {};
  if(planId){
    param.planId = planId;
  }
  return pget(`/rise/plan/load`, param)
}

export function loadPlanHistory(series, planId) {
  let param = {};
  if(planId){
    param.planId = planId;
  }
  return pget(`/rise/plan/history/load/${series}`, param)
}

export function loadPlanIntro(planId) {
  return pget(`/rise/plan/play/${planId}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function completePlan(planId) {
  return ppost(`/rise/plan/complete${planId?'?planId='+planId:''}`)
}

export function closePlan(planId) {
  return ppost(`/rise/plan/close${planId?'?planId='+planId:''}`)
}

export function updateOpenRise(){
  return ppost(`/rise/plan/openrise`)
}

export function checkPractice(series, planId){
  return ppost(`/rise/plan/check/${series}${planId?'?planId='+planId:''}`)
}

export function gradeProblem(problemScores,problemId){
  return ppost(`/rise/problem/grade/${problemId}`,problemScores);
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
