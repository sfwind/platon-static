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
// 获取小课卡包页面所有数据
export function loadCardData(planId) {
  return pget(`/rise/problem/cards/${planId}`)
}
// 获取卡片大图
export function loadEssenceCard(problemId, chapterId) {
  return pget(`/rise/problem/card/${problemId}/${chapterId}`)
}
// 将 svgBase64 转换成 pngBase64
export function convertSvgToPng(svgBase64) {
  return ppost(`/rise/problem/card/convert?svgBase64=${svgBase64}`)
}
