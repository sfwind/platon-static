import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadPreview (practicePlanId) {
  return requestProxy.getProxy(`/rise/practice/preview/start/${practicePlanId}`)
}

export function learnPreview (practicePlanId) {
  return requestProxy.postProxy(`/rise/practice/preview/learn/${practicePlanId}`)
}

