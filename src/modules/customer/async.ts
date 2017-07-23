import { pget, ppost } from "../../utils/request";

export function loadMineQuestions(){
  return pget("/rise/customer/forum/mine/questions");
}

export function loadMineAnswers(){
  return pget("/rise/customer/forum/mine/answers");
}

export function loadUserProfileInfo(){
  return pget('/rise/customer/profile');
}
