import { pget } from '../../../utils/request'

export function loadPrize() {
  return pget(`/rise/operation/prize/load`)
}

export function exchangePrize(prizeCardId) {
  return pget(`/rise/operation/prize/exchange/${prizeCardId}`)
}
