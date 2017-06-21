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

// 根据 questionId 获取问题信息
export function getQuestion(questionId) {
  return pget(`/forum/question/load/${questionId}`)
}

// 对答案进行赞同
export function approveAnswer(answerId) {
  return ppost(`/forum/answer/approve/${answerId}`)
}

// 对答案取消赞同
export function disApproveAnswer(answerId) {
  return ppost(`/forum/answer/approve/cancel/${answerId}`)
}

// 根据 answerId 获取答案详情
export function getAnswer(answerId) {
  return pget(`/forum/answer/load/${answerId}`)
}
