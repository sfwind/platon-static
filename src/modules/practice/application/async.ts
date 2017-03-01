import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id) {
  return pget(`/rise/practice/application/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function submitApplicationPractice(submitId, params) {
  return ppost(`/rise/practice/application/submit/${submitId}`, params)
}

export function vote(referencedId){
  return ppost("/rise/practice/vote", {referencedId: referencedId, status: 1,type:CommentType.Application})
}

export function loadOtherList(applicationId,page){
  return pget(`/rise/practice/application/list/other/${applicationId}`,{page:page})
}

export function loadCommentList(submitId,page){
  return pget(`/rise/practice/comment/${CommentType.Application}/${submitId}`,{page:page})
}

export function comment(submitId,content){
  return ppost(`/rise/practice/comment/${CommentType.Application}/${submitId}`,{content:content})
}

const CommentType = {
  Challenge:1,
  Application:2,
}

const VoteType = {
  Challenge:1,
  Application:2,
}
