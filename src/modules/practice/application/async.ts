import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id,planId) {
  let param = {};
  if(planId){
    param.planId = planId;
  }
  return pget(`/rise/practice/application/start/${id}`,param)
}

export function submitApplicationPractice(planId,applicationId, params) {
  return ppost(`/rise/practice/application/submit/${planId}/${applicationId}`, params)
}

export function vote(referencedId){
  return ppost("/rise/practice/vote", {referencedId: referencedId, status: 1,type:CommentType.Application})
}

export function loadOtherList(applicationId,page){
  return pget(`/rise/practice/application/list/other/${applicationId}`,{page:page})
}

export function loadCommentList(submitId,page,searchTime){
  return pget(`/rise/practice/comment/${CommentType.Application}/${submitId}`,{page:page,searchType:searchTime})
}

export function comment(submitId,content){
  return ppost(`/rise/practice/comment/${CommentType.Application}/${submitId}`,{content:content})
}

export function openApplication(){
  return ppost('/rise/plan/open/application');
}


export function getOpenStatus(){
  return pget('/rise/plan/open/status');
}

export function deleteComment(id){
  return ppost(`/rise/practice/delete/comment/${id}`)
}

export const CommentType = {
  Challenge:1,
  Application:2,
}

const VoteType = {
  Challenge:1,
  Application:2,
}
