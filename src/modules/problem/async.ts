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

export function openProblemIntroduction(id){
  return pget(`/rise/problem/open/${id}`)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function checkCreatePlan(problemId,type) {
  return ppost(`/rise/plan/choose/problem/check/${problemId}/${type}`)
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

export function calculateCoupon(couponId,problemId){
  return ppost(`/signup/coupon/course/calculate`, {couponId: couponId, problemId: problemId})
}

export function loadUserCoupons(){
  return pget(`/signup/coupon/list`);
  // return Promise.resolve({code:200,msg:[]});
}

export function loadPayParam(param){
  // return Promise.resolve({code:200,msg:{fee:200, free:false, signParams:{}, productId:'ff'}})
  return ppost('/signup/rise/course/pay', param);
}

export function afterPayDone(productId){
  return ppost(`/signup/paid/rise/${productId}`);
}

export function logPay(type){
  pget(`/signup/mark/pay/${type}`);
}
