import { pget, ppost } from 'utils/request'

export function closePlan(planId) {
  return ppost(`/rise/plan/close${planId ? '?planId=' + planId : ''}`)
}

export function gradeProblem(problemScores, problemId) {
  return ppost(`/rise/problem/grade/${problemId}`, problemScores)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function queryReport(planId) {
  return pget(`/rise/plan/improvement/report${planId ? '?planId=' + planId : ''}`)
}

// 章节结束获取章节精华图片
export function loadChapterCard(problemId, practicePlanId) {
  return pget(`/rise/plan/chapter/card/${problemId}/${practicePlanId}`)
}

// 章节结束返回是否弹出精华卡片
export function loadChapterCardAccess(problemId, practicePlanId) {
  return pget(`/rise/plan/chapter/card/access/${problemId}/${practicePlanId}`)
}

export function loadStudyline(planId) {
  return pget(`/rise/plan/load/studyline/${planId}`)
}
