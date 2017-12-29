import { pget, ppost } from '../../utils/request'

export function loadUnusedPrizes() {

  return pget(`/rise/operation/prize/unused/cards`)
}

export function setReceived(id) {
  return pget(`/rise/operation/prize/card/received/${id}`)
}

export function setCardShared(id) {
  return pget(`/rise/operation/prize/card/shared/${id}`)
}
