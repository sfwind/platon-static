import { pget, ppost } from "../../utils/request";

export function loadBusinessApplyQuestion() {
  return pget('/rise/business/load/questions');
}


export function submitApply(param) {
  return ppost('/signup/submit/apply', param);
}

export function sendValidCode(phone) {
  return ppost('/rise/customer/send/valid/code', { phone: phone });
}

export function validSMSCode(param) {
  return ppost('/rise/customer/valid/sms', param);
}

export function loadSurvey(category) {
  return pget(`/rise/survey/load/${category}`)
}

export function submitSurvey(category, param) {
  return ppost(`/rise/survey/submit/${category}`, param);
}

export function loadSurveySubmit(category) {
  return pget(`/rise/survey/load/submit/${category}`);
}

export function loadSurveySubmitByRefer(refer) {
  return pget(`/rise/survey/load/submit/refer/${refer}`);
}

export function loadSurveySubmitUpname(id) {
  return pget(`/rise/survey/load/submit/upname/${id}`);
}

