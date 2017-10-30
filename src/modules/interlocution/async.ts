import { pget, ppost } from "utils/request";

// 首页获取所有问题详情
export function getInterlocutionQuestions(page, date) {
  if(!page) page = 1
  return pget(`/rise/interlocution/load/quesiton/list/${date}`, { page })
}

export function submitInterlocutionQuestion(inerQuestion) {
  return ppost(`/rise/interlocution/question/submit`, inerQuestion);
}

export function loadInterlocutionDateInfo(date) {
  return pget(`/rise/interlocution/interlocution/info/${date}`);
}

export function follow(id) {
  return ppost(`/rise/interlocution/follow/${id}`);
}

export function unfollow(id) {
  return ppost(`/rise/interlocution/follow/cancel/${id}`);
}

export function loadQuanAnswer(date) {
  return pget(`/rise/interlocution/load/quanquan/${date}`);
}

export function goSubmitPage(date) {
  return pget(`/rise/interlocution/go/question/submit/${date}`);
}

export function checkSubscribe(callback, key) {
  return pget(`/rise/customer/check/subscribe/{key}`, { callback: callback });
}
