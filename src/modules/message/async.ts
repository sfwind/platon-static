import { pget, ppost } from "../../utils/request";

export function loadMessage(offset) {
  return pget('/rise/message/load', {page:offset})
}

export function loadWarmUp(id) {
  return pget(`/rise/practice/warmup/${id}`)
}

export function loadWarmUpDiscussReply(discussId) {
  return pget(`/rise/message/warmup/discuss/reply/${discussId}`)
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

export function submitSubject(problemId,title,content,id){
  console.log(problemId,title,content,id)
  return ppost(`/rise/practice/subject/submit/${problemId}`,{submitId:id,title:title,content:content});
}



const CommentType = {
  Challenge:1,
  Application:2,
  Subject:3,
}

const VoteType = {
  Challenge:1,
  Application:2,
  Subject:3
}
