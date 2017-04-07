import { pget, ppost } from "utils/request";

export function loadKnowledges(practicePlanId) {
  return pget(`/rise/practice/knowledge/start/${practicePlanId}`)
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/rise/practice/knowledge/learn/${knowledgeId}`)
}

export function loadRoadMap() {
  return pget(`/rise/plan/roadmap/`)
}
