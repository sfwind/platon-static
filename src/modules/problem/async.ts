import { pget, ppost } from "utils/request";

export function loadProblemList() {
  return pget(`/rise/problem/load`)
}

export function loadUnChooseList() {
  return pget(`/rise/problem/list/unchoose`)
}

export function loadProblem(id) {
  return pget(`/rise/problem/get/${id}`)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function checkCreatePlan(problemId) {
  return ppost(`/rise/plan/choose/problem/check/${problemId}`)
}

export function welcome() {
  return pget(`/rise/plan/welcome`)
}

export function mark(param) {
  return ppost('/rise/b/mark', param);
}

export function loadAllProblems() {
  return pget('/rise/problem/list/all');
}

export function loadCatalog(catalogId) {
  return pget(`/rise/problem/list/${catalogId}`);
}
// 获取小课扩展相关数据
export function loadProblemExtension(problemId) {
  return pget(`/rise/problem/extension/${problemId}`)
}
// 获取活动卡片 Base64 值
export function loadEssenceCard() {
  return pget(`/operation/free/card`)
}
