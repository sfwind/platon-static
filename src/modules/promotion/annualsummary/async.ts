import { pget } from '../../../utils/request'

export function getPromotionUserInfo() {
  return pget('/rise/operation/annual/summary/user')
}

export function getPromotionSchoolGate() {
  return pget('/rise/operation/annual/summary/schoolgate')
}

export function getPromotionActivityCenter() {
  return pget('/rise/operation/annual/summary/activitycenter')
}

export function getPromotionLibrary() {
  return pget('/rise/operation/annual/summary/library')
}

export function getPromotionAuditorium() {
  return pget('/rise/operation/annual/summary/auditorium')
}
