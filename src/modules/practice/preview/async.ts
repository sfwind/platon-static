import { pget, ppost } from 'utils/request'
import requestProxy from '../../../components/requestproxy/requestProxy'

export function loadPreview (practicePlanId) {
  return pget(`/rise/practice/preview/start/${practicePlanId}`)
}

export function learnPreview (practicePlanId) {
  return ppost(`/rise/practice/preview/learn/${practicePlanId}`)
}

