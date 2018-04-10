import { pget, ppost } from 'utils/request'
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadKnowledges (practicePlanId) {
  return requestProxy.getProxy(`/rise/practice/knowledge/start/${practicePlanId}`)
}

export function learnKnowledge (practicePlanId) {
  return ppost(`/rise/practice/knowledge/learn/${practicePlanId}`)
}

export function knowledgeReview (id) {
  return pget(`/rise/plan/knowledge/review/${id}`)
}

export function loadKnowledge (id) {
  return requestProxy.getProxy(`/rise/practice/knowledge/${id}`)
}

export function loadDiscuss (knowledgeId, offset) {
  return pget(`/rise/practice/knowledge/discuss/${knowledgeId}/${offset}`)
}

export function discussKnowledge (body) {
  return requestProxy.postProxy(`/rise/practice/knowledge/discuss`, body)
}

export function deleteKnowledgeDiscuss (id) {
  return requestProxy.postProxy(`/rise/practice/knowledge/discuss/del/${id}`)
}

export function loadKnowledgePriorityDiscuss (knowledgeId) {
  return requestProxy.getProxy(`/rise/practice/knowledge/priority/discuss/${knowledgeId}`)
}
