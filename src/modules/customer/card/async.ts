import { pget } from 'utils/request'

export function loadUnreceivedPrizes() {
  return pget(`/rise/prize/unreceived/cards`)
}

export function receivePreviewCard(cardId) {
  return pget(`/rise/prize/card/preview?cardId=${cardId}`)
}

export function sendTemplate() {
  return pget(`/rise/prize/card/send/message`)
}

export function loadCard(cardId){
  return pget(`/rise/prize/card/owner/check?cardId=${cardId}`)
}
