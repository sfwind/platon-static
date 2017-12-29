import { pget } from '../../utils/request'

export function loadCampCountDown() {
  return pget(`/rise/operation/group/count/down`)
}
