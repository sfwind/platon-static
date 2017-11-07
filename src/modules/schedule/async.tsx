import { pget, ppost } from '../../utils/request'

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
