import { pget, ppost } from "utils/request";

export function initSchedule(questionList) {
  return ppost('/rise/schedule/init', { questionList: questionList });
}

export function loadQuestions() {
  return pget('/rise/schedule/load/questions');
}

export function loadCountDownInfo(){
  return pget('/rise/schedule/count/down');
}
