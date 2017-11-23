import { pget, ppost } from "../../utils/request";

export function loadBusinessApplyQuestion(){
  return pget('/rise/business/load/questions');
}

export function checkSubmitApply(){
  return pget('/rise/business/check/submit/apply');
}
