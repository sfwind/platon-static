import { pget } from '../../../utils/request'

export function getPromotionUserInfo() {
  return pget('/rise/operation/annual/summary/user')
}

export function getPromotionLibrary() {
  return pget('/rise/operation/annual/summary/library')
}

export function getPromotionAuditorium() {
  return pget('/rise/operation/annual/summary/auditorium')
}
