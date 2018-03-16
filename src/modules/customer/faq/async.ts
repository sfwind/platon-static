import { pget, ppost } from "utils/request";

export function submitFeedback(param){
  return ppost('/rise/customer/feedback', param);
}

