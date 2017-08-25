import { pget, ppost } from "utils/request";

export function submitEva(score) {
  return ppost(`/rise/operation/free/submit/${score}`)
}

export function initEva(score) {
  return pget(`/rise/operation/free/init`)
}

export function shareResult() {
  return ppost(`/rise/operation/free/share`)
}
