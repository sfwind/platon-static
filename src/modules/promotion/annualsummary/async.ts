import { pget } from '../../../utils/request'

export function getPromotionUserInfo(riseId?) {
  console.log(riseId)
  return pget(`/rise/operation/annual/summary/user${riseId ? '?riseId=' + riseId : ''}`)
}

export function getPromotionLibrary(riseId) {
  return pget(`/rise/operation/annual/summary/library?riseId=${riseId}`)
}

export function getPromotionAuditorium(riseId) {
  return pget(`/rise/operation/annual/summary/auditorium?riseId=${riseId}`)
}
