import { pget } from '../../utils/request'

export function loadLandingPageData () {
  return pget('/rise/landing/load')
}
