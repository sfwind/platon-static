import { pget, ppost } from 'utils/request'
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadApplicationPractice (id, planId) {
  let param = {}
  if (planId) {
    param.planId = planId
  }
  return requestProxy.getProxy(`/rise/practice/application/start/${id}`, param)
}

export function loadApplicationCompletedCount (planId) {
  return requestProxy.getProxy(`/rise/practice/application/completed/count/${planId}`)
}

export function isRiseMember () {
  return requestProxy.getProxy('/rise/plan/risemember')
}

export function submitApplicationPractice (planId, applicationId, params) {
  return requestProxy.postProxy(`/rise/practice/application/submit/${planId}/${applicationId}`, params)
}

export function autoSaveApplicationDraft (planId, applicationId, draft) {
  return ppost(`/rise/practice/application/autosave/${planId}/${applicationId}`, { draft: draft })
}

export function vote (referencedId) {
  return requestProxy.postProxy('/rise/practice/vote', { referencedId: referencedId, status: 1, type: CommentType.Application })
}

export function loadOtherList (applicationId, page) {
  return requestProxy.getProxy(`/rise/practice/application/list/other/${applicationId}`, { page: page })
}

export function loadOtherListBatch (applicationId, index) {
  return requestProxy.getProxy(`/rise/practice/application/list/other/${applicationId}/${index}`)
}

export function loadCommentList (submitId, page) {
  return pget(`/rise/practice/comment/${CommentType.Application}/${submitId}`, { page: page })
}

export function comment (submitId, content) {
  return ppost(`/rise/practice/comment/${CommentType.Application}/${submitId}`, { comment: content })
}

export function commentReply (submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${CommentType.Application}/${submitId}`, {
    comment: comment,
    repliedId: replyedCommentId,
  })
}

export function openApplication () {
  return requestProxy.postProxy('/rise/open/application')
}

export function getOpenStatus () {
  return requestProxy.getProxy('/rise/open/status')
}

export function getApplicationPractice (submitId) {
  return pget(`/rise/practice/application/article/${submitId}`)
}

export function deleteComment (id) {
  return ppost(`/rise/practice/delete/comment/${id}`)
}

export const CommentType = {
  Challenge: 1,
  Application: 2,
}

const VoteType = {
  Challenge: 1,
  Application: 2,
}

export const ArticleViewModule = {
  Challenge: 1,
  Application: 2,
  Subject: 3,
}

export function loadPriorityApplicationCommenst (applicationId, planId) {
  return requestProxy.getProxy(`/rise/practice/application/load/priority/submits?applicationId=${applicationId}&planId=${planId}`)
}
