import { pget, ppost } from "utils/request";

// 首页获取所有问题详情
export function getAllQuestions(page) {
  if(!page) page = 1
  return pget(`/forum/question/load/list`, { page })
}

// 关注问题
export function follow(questionId) {
  return ppost(`/forum/question/follow/${questionId}`)
}

// 取消关注
export function disFollow(questionId) {
  return ppost(`/forum/question/follow/cancel/${questionId}`)
}
