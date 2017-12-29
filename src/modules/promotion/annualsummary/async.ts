import { pget, ppost } from '../../../utils/request'

export function getPromotionUserInfo(riseId?) {
  return pget(`/rise/operation/annual/summary/user${riseId ? '?riseId=' + riseId : ''}`)
}

export function getPromotionSchoolGate(riseId) {
  return pget(`/rise/operation/annual/summary/schoolgate?riseId=${riseId}`)
}

export function getPromotionLibrary(riseId) {
  return pget(`/rise/operation/annual/summary/library?riseId=${riseId}`)
}

export function getPromotionAuditorium(riseId) {
  return pget(`/rise/operation/annual/summary/auditorium?riseId=${riseId}`)
}

export function loadPrizeCard(riseId) {
  return ppost(`/rise/operation/annual/summary/card?riseId=${riseId}`)
}

export function receivePrizeCard(riseId) {
  return ppost(`/rise/operation/annual/summary/card/receive?riseId=${riseId}`)
}
