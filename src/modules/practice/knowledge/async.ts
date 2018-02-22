import { pget, ppost } from "utils/request";

export function loadKnowledges(practicePlanId) {
  return pget(`/rise/practice/knowledge/start/${practicePlanId}`)
}

export function learnKnowledge(practicePlanId) {
  return ppost(`/rise/practice/knowledge/learn/${practicePlanId}`)
}

export function knowledgeReview(id) {
  return pget(`/rise/plan/knowledge/review/${id}`)
}

export function loadKnowledge(id){
  return pget(`/rise/practice/knowledge/${id}`);
}

export function loadDiscuss(knowledgeId,offset){
  return pget(`/rise/practice/knowledge/discuss/${knowledgeId}/${offset}`);
}

export function discussKnowledge(body){
  return ppost(`/rise/practice/knowledge/discuss`,body);
}

export function deleteKnowledgeDiscuss(id) {
  return ppost(`/rise/practice/knowledge/discuss/del/${id}`)
}

