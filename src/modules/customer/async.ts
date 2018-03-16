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
