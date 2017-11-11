import { pget, ppost } from 'utils/request'

export function loadSchedulePlan(){
  return pget('/rise/schedule//load/plan')
}
