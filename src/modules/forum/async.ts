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

// 提交答案
// 新增答案，则第三个参数不用传递
// 修改答案，传递第三个修改 answerId
export function submitAnswer(questionId, answer, answerId?) {
  return ppost(`/forum/answer/submit`, { questionId, answer, answerId })
}

// 对答案进行评论
export function commentAnswer(answerId, comment, repliedCommentId?) {
  return ppost(`/forum/answer/comment`, { answerId, comment, repliedCommentId })
}

// 删除答案的评论
export function commentAnswerDel(commentId) {
  return ppost(`/forum/answer/delete/comment/${commentId}`)
}

// 获取所有的提问标签
export function loadTag() {
  return pget('/forum/question/tag/load');
}

// 根据标签获取相关的问题
export function loadQuestionByTag(tag){
  return pget(`/forum/question/search/${tag}`);
}

// 提交问题
export function submitQuestion(param){
  return ppost(`/forum/question/submit`, param);
}
