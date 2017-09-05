import { pget, ppost } from '../../utils/request'

export function loadMessage(offset) {
  return pget('/rise/message/load', { page: offset })
}

export function loadOldCount() {
  return pget('/rise/message/old/count/load')
}

export function getOldMsg() {
  return pget('/rise/message/old/get')
}

export function loadWarmUp(id) {
  return pget(`/rise/practice/warmup/${id}`)
}

export function loadWarmUpDiscussReply(discussId) {
  return pget(`/rise/message/warmup/discuss/reply/${discussId}`)
}

export function loadKnowledgeDiscussReply(discussId) {
  return pget(`/rise/message/knowledge/discuss/reply/${discussId}`)
}

export function readMessage(messageId) {
  return ppost(`/rise/message/read/${messageId}`)
}

export function commentReply(moduleId, submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${moduleId}/${submitId}`, {
    comment: comment, repliedId: replyedCommentId
  })
}

export function requestComment(submitId) {
  return ppost(`/rise/practice/request/comment/${CommentType.Subject}/${submitId}`)
}

export function loadKnowledge(id) {
  return pget(`/rise/practice/knowledge/${id}`)
}

export function discussKnowledge(body) {
  return ppost(`/rise/practice/knowledge/discuss`, body)
}

export function discuss(params) {
  return ppost(`/rise/practice/warmup/discuss`, params)
}

export function requestCommentByType(type, submitId) {
  return ppost(`/rise/practice/request/comment/${type}/${submitId}`)
}

export function loadArticleData(moduleId, commentId) {
  return pget(`/rise/message/comment/reply/${moduleId}/${commentId}`)
}

export function deleteComment(id) {
  return ppost(`/rise/practice/delete/comment/${id}`)
}

export function increaseArticleShow(moduleId, submitId) {
  return pget(`/rise/practice/article/show/${moduleId}/${submitId}`)
}

export function loadApplicationCommentOfMessage(submitId, commentId) {
  return pget(`/rise/practice/comment/message/${submitId}/${commentId}`)
}

export function submitEvaluation(commentId, useful, reason) {
  return ppost(`/rise/practice/evaluate/application`, { commentId, useful, reason })
}

export function getNotifyStatus(){
  return pget('/rise/message/status/learning/notify');
}

export function openNotifyStatus(){
  return ppost('/rise/message/open/learning/notify');
}

export function closeNotifyStatus(){
  return ppost('/rise/message/close/learning/notify');
}

export const CommentType = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}

const VoteType = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}

export const ArticleViewModule = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}
