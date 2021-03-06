import { pget, ppost } from 'utils/request'

export function loadProblemList() {
  return pget(`/rise/problem/load`)
}

export function loadUnChooseList() {
  return pget(`/rise/problem/list/unchoose`)
}

export function loadMyProblem(id) {
  return pget(`/rise/problem/get/my/${id}`)
}

export function openProblemIntroduction(id, free, practicePlanId?) {
  let param = free ? { autoOpen: 'true' } : { autoOpen: 'false' }
  if(practicePlanId){
    param.practicePlanId = practicePlanId
  }
  return pget(`/rise/problem/open/${id}`, param)
}

export function loadAllProblems() {
  return pget('/rise/problem/list/all')
}

export function loadCatalog(catalogId) {
  return pget(`/rise/problem/list/${catalogId}`)
}

// 获取课程扩展相关数据
export function loadProblemExtension(problemId) {
  return pget(`/rise/problem/extension/${problemId}`)
}

// 获取课程卡包页面所有数据
export function loadCardData(planId) {
  return pget(`/rise/problem/cards/${planId}`)
}

// 获取卡片大图
export function loadEssenceCard(problemId, chapterId) {
  return pget(`/rise/problem/card/${problemId}/${chapterId}`)
}
