import { pget, ppost } from "../../utils/request";

export function loadUserProfileInfo(){
  return pget('/rise/customer/profile');
}

export function loadUserAccount(){
  return pget('/rise/customer/account')
}

export function loadUserCoupon(){
  return pget('/rise/customer/coupon')
}

export function loadUserInfo(){
  return pget('/rise/customer/profile/info')
}

export function loadStudyReport(){
  return pget('/rise/customer/finished/plans')
}

export function loadCardList() {
  return pget('/rise/problem/card/list')
}
