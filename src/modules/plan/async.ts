import { pget, ppost } from 'utils/request'

export function loadPlan(planId) {
  let param = {}
  if(planId) {
    param.planId = planId
  }
  return pget(`/rise/plan/load`, param)
}

export function completePlan(planId) {
  return ppost(`/rise/plan/complete${planId ? '?planId=' + planId : ''}`)
}

export function markPlan(series, planId) {
  return ppost(`/rise/plan/mark/${series}${planId ? '?planId=' + planId : ''}`)
}

export function closePlan(planId) {
  return ppost(`/rise/plan/close${planId ? '?planId=' + planId : ''}`)
}

export function checkPractice(series, planId) {
  return ppost(`/rise/plan/check/${series}${planId ? '?planId=' + planId : ''}`)
}

export function gradeProblem(problemScores, problemId) {
  return ppost(`/rise/problem/grade/${problemId}`, problemScores)
}

export function isRiseMember() {
    return pget('/rise/plan/risemember')
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/rise/practice/knowledge/learn/${knowledgeId}`)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function queryEventList() {
  return pget('/rise/customer/event/list')
}

export function queryChapterList(planId) {
  return pget(`/rise/plan/chapter/list`, { planId: planId })
}

export function queryReport(planId) {
  return pget(`/rise/plan/improvement/report${planId ? '?planId=' + planId : ''}`)
}

export function loadRecommendations(problemId) {
  return pget(`/rise/plan/improvement/report/recommendation/${problemId}`)
}

export function loadPlanList() {
  return pget('/rise/plan/list')
}

// 章节结束获取章节精华图片
export function loadChapterCard(problemId, practicePlanId) {
  return pget(`/rise/plan/chapter/card/${problemId}/${practicePlanId}`)
}

// 章节结束返回是否弹出精华卡片
export function loadChapterCardAccess(problemId, practicePlanId) {
  return pget(`/rise/plan/chapter/card/access/${problemId}/${practicePlanId}`)
}

export function loadHasGetOperationCoupon() {
  return pget('/rise/operation/free/coupon')
}


export function hasPrivilege(){
  return pget(`/signup/check/business/school/privilege`);
}

export function createCampPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/camp/${problemId}`)
}

export function unlockCampPlan(planId) {
  return ppost(`/rise/plan/choose/problem/camp/unlock/${planId}`)
}

/**
 * 试听课开课
 */
export function openAudition() {
  return ppost('/rise/plan/open/audition/course')
}
