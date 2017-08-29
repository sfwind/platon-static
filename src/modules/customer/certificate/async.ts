import { pget, ppost } from "../../../utils/request";

export function loadUserProfileInfo(){
  return pget('/rise/customer/profile');
}

export function submitProfileInfo(param){
  return ppost('/rise/customer/profile/certificate', param);
}

export function getCertificate(certificate){
  return pget(`/rise/customer/certificate/${certificate}`);
}
