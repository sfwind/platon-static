import { pget, ppost } from "utils/request";

export function loadMessage(offset) {
  return pget(`/rise/message/load/${offset}`)
}

export function loadWarmUp(id) {
  return pget(`/rise/practice/warmup/${id}`)
}

export function loadWarmUpDiscussReply(discussId) {
  return pget(`/rise/message/warmup/discuss/reply/${discussId}`)
}

export function readMessage(messageId) {
  return ppost(`/rise/message/read/${messageId}`)
}


