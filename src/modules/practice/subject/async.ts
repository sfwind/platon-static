import { pget, ppost } from "utils/request";

export function loadSubject(subjectId){
  return pget(`/rise/practice/subject/{subjectId}`);
}

export function loadSubjects(problemId,page){
  return pget(`/rise/practice/subject/list/${problemId}`,{page:page});
}

export function submitSubject(problemId,title,content,id,labels){
  console.log('paran',problemId,title,content,id,labels)
  return ppost(`/rise/practice/subject/submit/${problemId}`,{submitId:id,title:title,content:content,labelList:labels});
}

export function loadCommentList(submitId,page){
  return pget(`/rise/practice/comment/${CommentType.Subject}/${submitId}`,{page:page})
}

export function comment(submitId,content){
  return ppost(`/rise/practice/comment/${CommentType.Subject}/${submitId}`,{content:content})
}

export function vote(referencedId){
  return ppost("/rise/practice/vote", {referencedId: referencedId, status: 1,type:CommentType.Subject})
}

export function loadSubjectDesc(subjectId){
  return pget(`/rise/practice/subject/desc/${subjectId}`);
}

export function loadLabels(problemId){
  return pget(`/rise/practice/label/${problemId}`);
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
