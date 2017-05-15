import { pget, ppost } from "../../utils/request";

export function loadMessage(offset) {
  return pget('/rise/message/load', {page:offset})
}

export function loadOldCount(){
  return pget('/rise/message/old/count/load');
}

export function getOldMsg(){
  return pget('/rise/message/old/get');
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

export function loadSubjectCommentList(submitId,page){
  return pget(`/rise/practice/comment/${CommentType.Subject}/${submitId}`,{page:page})
}

export function commentSubject(submitId,content){
  return ppost(`/rise/practice/comment/${CommentType.Subject}/${submitId}`,{content:content})
}

export function loadSubject(submitId){
  return pget(`/rise/practice/subject/${submitId}`)
}

export function submitSubject(problemId,title,content,id,labels){
  return ppost(`/rise/practice/subject/submit/${problemId}`,{submitId:id,title:title,content:content,labelList:labels});
}

export function requestComment(submitId){
  return ppost(`/rise/practice/request/comment/3/${submitId}`);
}

export function loadKnowledge(id){
  return pget(`/rise/practice/knowledge/${id}`)
}

export function discussKnowledge(body){
  return ppost(`/rise/practice/knowledge/discuss`,body);
}

export function discuss(params) {
  return ppost(`/rise/practice/warmup/discuss`, params)
}

export function requestCommentByType(type, submitId){
  return ppost(`/rise/practice/request/comment/${type}/${submitId}`);
}

export const CommentType = {
  Challenge:1,
  Application:2,
  Subject:3,
}

const VoteType = {
  Challenge:1,
  Application:2,
  Subject:3
}
