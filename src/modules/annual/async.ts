import { pget } from '../../utils/request'

export function loadAnnualPrizeCards(riseId) {
  return pget(`/rise/operation/prize/load/annual/${riseId}`)
}

export function loadPersonalAnnualPrizeCard() {
  return pget(`/rise/operation/prize/load/annual`)
}

export function receiveAnnualCards(cardId) {
  return pget(`/rise/operation/prize/annual/receive/${cardId}`)
}

export function checkSubscribe(callback, key) {
  return pget(`/rise/customer/check/subscribe/${key}`, { callback: callback })
}

export function loadAnnualCounts() {
  return pget(`/rise/operation/prize/annual/load/count`)
}

export function receivePreviewCard(cardId) {
  return pget(`/rise/operation/prize/card/preview/${cardId}`)
}
