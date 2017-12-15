import { pget, ppost } from '../../utils/request'

export function initSchedule(questionList) {
  return ppost('/rise/schedule/init', { questionList: questionList })
}

export function loadQuestions() {
  return pget('/rise/schedule/load/questions')
}

export function loadCountDownInfo() {
  return pget('/rise/schedule/count/down')
}

export function loadPersonalSchedule() {
  return pget(`/rise/schedule/load/personal`)
}

export function loadDefaultSchedule() {
  return pget(`/rise/schedule/load/default`)
}

export function updateSelected(id, selected) {
  return ppost(`/rise/schedule/update/selected`, { id, selected })
}

export function updateCourseScheduleAll(data) {
  return ppost(`/rise/schedule/update/all`, { monthCourseSchedules: data })
}

export function loadCampCountDown() {
  return pget(`/rise/schedule/camp/count/down`)
}
